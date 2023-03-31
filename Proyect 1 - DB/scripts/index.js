
//Variables para conectarse a mongo.
const mongoose = require('mongoose');
const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
let db;
const URI = 'mongodb+srv://jeffleivajr:Soldadojeff01@cluster0.qhohgzz.mongodb.net/test?retryWrites=true&w=majority';
const conn = mongoose.createConnection(URI, {useNewUrlParser: true});
const JSZIP = require('jszip');
const fileSaver = require('file-saver');
const Dataset = require('./Model/Dataset.js');
const mongoDB = require('mongodb');
const fs = require('fs');
const stream = require('stream');
const { PassThrough } = stream;
//Variables para conectarse a Neoj4
const neo4j = require('neo4j-driver');
const archiver = require('archiver');
const URI4J = 'neo4j+s://ae1ed961.databases.neo4j.io';
const user = 'neo4j';
const password = 'BThhcs9ej1_LMh4HtwD8l2YgZ69pixvoDA_2ybCKxxY';
const driver = neo4j.driver(URI4J, neo4j.auth.basic(user, password));
const FileSaver  = require('file-saver');

//Variables para conectarse a redis
//const Redis = require("ioredis");
//const redisDB = new Redis("redis://default:b953727216e840ba8c2590cb8b4ceeee@usw1-ruling-falcon-34023.upstash.io:34023");


//Variables para conectarse a mysql
//const mysql = require('mysql2')
//const connection = mysql.createConnection('mysql://4eme3kqqx4ueltv2mfzj:pscale_pw_L5cO1mxvZ83BMQUwcEYLLMWdEPBPMkrbQE7nB9TEK7t@us-east.connect.psdb.cloud/project?ssl={"rejectUnauthorized":true}')

app.listen(3000,()=>{
    console.log('app listening in port 3000');
});



app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const storage = new GridFsStorage({ db: conn,
    file:(req,file)=>{
        return {
            filename: file.originalname,
            bucketName: 'files',
        };
    } 
});

let gfs;

conn.once('open',()=>{
    gfs = new mongoDB.GridFSBucket(conn.db, {bucketName: 'files'});
});

const upload = multer({storage});


app.set('view engine','html');

app.use(express.static(__dirname+'/'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/home.html');
});

app.get('/messages',(req,res)=>{
    res.sendFile(__dirname+'/messages.html');
});


let id;


app.post('/upload',upload.array('file'),(req,res)=>{
    const files = req.files;
    console.log(req.body);
    const Ids = [];
    files.forEach(element => {
        console.log(element.id);
        Ids.push(element.id);
    });
    mongoose.connect(URI);
    Dataset.create({name: "pruebaDataset",
    description: "Para probar",
    archivosDataset: Ids,
    });
    res.json({body: req.body});
});


//Funciona
app.get('/dataset/:id',async function(req,res){
    //IMPORTANTE
    // id = ObjectID
    // El id de la direccion tiene que pasarse a string con ObjectId.toString() antes
    // de ponerselo a la URL-> /dataset/:id
    mongoose.connect(URI);
    let idDataset = new mongoDB.ObjectId(req.params.id);
    console.log(idDataset);
    const dataset = await findDataset(idDataset);
    console.log(dataset);
    //Por aqui iria la llamada al metodo de mongo que busca el Dataset
    let Idsfiles = dataset.archivosDataset;
    const archive = archiver('zip',{zlib: {level: 9}});
    res.set('Content-Type', 'zip');
    res.set('Content-Disposition', `attachment; filename=${dataset.name}.zip; returnUrl=${encodeURIComponent(req.query.returnUrl)}`);
    for(let i = 0;i<Idsfiles.length;i++){
        let metadataFile = await gfs.find({"_id": Idsfiles[i]}).toArray();
        let objectMetadata = metadataFile[0];
        let filename = objectMetadata.filename;
        let downloadStream = await gfs.openDownloadStream(Idsfiles[i]);
        archive.append(downloadStream,{name:filename});
    }
    archive.finalize();
    archive.pipe(res);
});

app.post("/datasets",async function (req,res){
    let request = await getUploadedDatasets(req.body.data);
    res.json({"response": request});
})

app.post("/getObjectId",(req,res)=>{
    let id = mongoose.Types.ObjectId(req.body.data);
    res.json({"idDataset": id});
})

function findDataset(idDataset){
    mongoose.connect(URI);
    const dataset = Dataset.findById(idDataset);
    return dataset;
}

//Algunos metodos de Neo4j.


async function createUser(User){
    const session = driver.session({database: 'neo4j'});
    try{
        const query = `CREATE (User {id_mongo: ${User.id},username: ${User.username}})`;
        await session.executeWrite(transaction => transaction.run(query));
    }catch(error){
        console.error(error);
    }finally{
        session.close();
    }
}
//Metodo que agrega una relacion de like entre un usuario y un dataset
//Agrega relacion en ambos sentidos con los puntos dados por el usuario.
async function addUserLike(User,Dataset,Points){
    const session = driver.session({database: 'neo4j'});
    try{
        const query = `MATCH (us:User {id_mongo: ${User.idUser}}),(dat:Dataset {id_mongo: ${Dataset.id}) 
        CREATE (us)-[:LIKES {points: ${Points}}]->(dat)-[:LIKED_BY {points: ${Points}}]->(us)`;
        await session.executeWrite(transaction => transaction.run(query));
    }catch(error){
        console.error(error);
    }finally{
        session.close();
    }
}

async function deleteUserLike(User,Dataset){
    const session = driver.session({database: 'neo4j'});
    try{
        const query= `Match (us:User {id_mongo: ${User.idUser}})-[rel:LIKES]->(dat:Dataset {id_mongo: ${Dataset.id}}-[relTwo:LIKED_BY]->(us:User {id_mongo: ${User.idUser}}))
        DELETE rel,relTwo`
        await session.executeWrite(transaction=>transaction.run(query));
    }catch(error){
        console.error(error);
    }finally{
        session.close();
    }
}

//Funcion que crea una relacion de FOLLOW y FOLLOWED BY entre dos nodos.
async function addUserFollow(UserOne,UserTwo){
    const session = driver.session({database: 'neo4j'});
    try{
        const query = `MATCH (follow: User {id_mongo: ${UserOne.idUser}}), (followed: User {id_mongo: ${UserTwo.idUser}}) MERGE (follow)-[:FOLLOWS]->(followed)
        MERGE (followed)-[:FOLLOWED_BY]->(follow)`;
        await session.executeWrite(transaction => transaction.run(query));
    }catch(error){
        console.error(error);
    }finally{
        session.close();
    }
}

//Elimina una relacion en ambos sentidos de seguimiento entre usuarios.
async function deleteUserFollow(UserOne, UserTwo){
    const session = driver.session({database: 'neo4j'});
    try{
        const firstPartQuery = `MATCH (follow: User {id: ${UserOne.idUser}})-[rel:FOLLOWS]->(followed: User {id: ${UserTwo.idUser}})
        DELETE rel`;
        await session.executeWrite(transaction => transaction.run(firstPartQuery));
        const secondPartQuery =  `MATCH (followed: User {id: ${UserTwo.idUser}})-[rel:FOLLOWED_BY]->(follow: User {id: ${UserOne.idUser}})
        DELETE rel`;
        await session.executeWrite(transaction=> transaction.run(secondPartQuery));
    }catch(error){
        console.error(error);
    }
}

//Agrega una relacion de UPLOAD de un dataset a un Usuario en particular.
async function userAddsDataset(User,Dataset){
    const session  = driver.session({database: 'neo4j'});
    try{
        const query = `MATCH (us: User {id: ${User.idUser}})
        MERGE (us)-[:UPLOADS]->(:Dataset {id_dataset: ${Dataset.id},name: "${Dataset.name}"})-[:UPLOADED_BY]->(us)`;
        await session.executeWrite(transaction => transaction.run(query));
    }catch(error){
        console.error(error);
    }finally{
        session.close();
    }
}

//Elimina un nodo dataset y sus relaciones.
async function userDeletesDataset(Dataset){
    const session  = driver.session({database: 'neo4j'});
    try{
        const query = `MATCH (data: Dataset {id: ${Dataset.id_dataset}}) DETACH data DELETE data`;
        await session.executeWrite(transaction => transaction.run(query));
    }catch(error){
        console.error(error);
    }finally{
        session.close();
    }
}


//Elimina un Nodo Usuario, a su vez elimina los datasets que este pudiese haber subido
async function deleteUser(User){
    const session = driver.session({database: 'neo4j'});
    try{
        let query = `MATCH (n:Dataset)-[:UPLOADED_BY]->(us:User {id_mongo: ${User.id}})
        DETACH n,us DELETE n,us`;
        await session.executeWrite(transaction=>transaction.run(query));
    }catch(error){
        console.log(error);
    }finally{
        session.close();
    }
}

//Crea una relacion de descarga entre el usuario y el dataset.
async function downloadDataset(User,Dataset){
    const session = driver.session({database: 'neo4j'});
    try{
        let query = `MATCH (us:User {id_mongo: ${User.id}}),(dat:Dataset {id_mongo:${Dataset.id}})
        CREATE (us)-[:DOWNLOADS]->(dat)-[:DOWNLOADED_BY]->(us)`
        await session.executeWrite(transaction=>transaction.run(query));
    }catch(error){
        console.log(error)
    }finally{
        session.close();
    }
}

//Consultar usuarios que han descargado un dataset en particular
async function downloadedUserDataset(Dataset){
    const session = driver.session({database: 'neo4j'});
    //Se guardan los nodos de usuarios que han descargado el dataset
    //A partir de este se pueden consultar todos estos usuarios y cuantos son mediante el largo
    //de la lista.
    let users = [];
    try{
        let query = `MATCH (us:User)-[:DOWNLOADS]-(dat:Dataset {id_mongo:${Dataset.id}}) RETURN us`;
        const cursor = await session.executeRead(transaction=>transaction.run(query));
        cursor.records.forEach((element)=>{
            let node = element._fields[0].properties;
            users.push(node);
        });
        return users;
    }catch(error){
        console.log(error);
    }finally{
        session.close();
    }
}

//Trae todos los nodos de Dataset que hayan sido likeados por el usuario.
async function getLikedDatasets(User){
    const session = driver.session({database: 'neo4j'});
    let likedDatasets = [];
    try{
        let query = `MATCH (n:Dataset)-[:LIKED_BY]->(us:User {id_mongo: ${User.id}}) RETURN n`;
        const cursor = await session.executeRead(transaction=>transaction.run(query));
        cursor.records.forEach((element)=>{
            let node = element._fields[0].properties;
            likedDatasets.push(node);
        })
        return likedDatasets;
    }catch(error){
        console.log(error);
    }finally{
        session.close();
    }
}

//Esta funcion retorna todos los Usuarios a los que sigue el usuario de entrada
//Para implementar en dos funcionalidades: Traer los datos de los usuarios que sigue el usuario
//logeado y presentarlos, O si un usuario sube un dataset, se le notifica a los demas a partir del
//arreglo
async function getFollowedUsers(User){
    const session = driver.session({database: 'neo4j'});
    let followedUsers = [];
    try{
        let query = `MATCH (us:User)-[:FOLLOWED_BY]->(entry:User {id_mongo: ${User.id}}) RETURN us`;
        const cursor = await session.executeRead(transaction=>transaction.run(query));
        cursor.records.forEach((element)=>{
            let node = element._fields[0].properties;
            followedUsers.push(node);
        })
        return followedUsers;
    }catch(error){
        console.log(error);
    }finally{
        session.close();
    }
}


//Funcion que retorna todos los datasets subidos por un usuario en particular.
async function getUploadedDatasets(User){
    const session = driver.session({database: 'neo4j'});
    let dataSets = [];
    try{
        let query = `MATCH (dat:Dataset)-[:UPLOADED_BY]->(us:User {id_mongo:"${User}"}) RETURN dat`;
        const cursor = await session.executeRead(transaction=>transaction.run(query));
        cursor.records.forEach((element)=>{
            let node = element._fields[0].properties;
            dataSets.push(node);
        })
        return dataSets;
    }catch(error){
        console.log(error);
    }finally{
        session.close();
    }
}


