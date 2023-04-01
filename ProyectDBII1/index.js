//Variables para conectarse a mongo.
const mongoose = require('mongoose');
const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
let db;
const URI = 'mongodb+srv://nottwithtt:Nicolita1998+@cluster0.gi2w4fi.mongodb.net/dbprojectDataSet?retryWrites=true&w=majority';
const conn = mongoose.createConnection(URI, {useNewUrlParser: true});
const JSZIP = require('jszip');
const fileSaver = require('file-saver');
//const Dataset = require('./Model/Dataset.js');
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
const Redis = require("ioredis");
const redisDB = new Redis("redis://default:b953727216e840ba8c2590cb8b4ceeee@usw1-ruling-falcon-34023.upstash.io:34023");

const mysql = require('mysql2');
const connection = mysql.createConnection(DATABASE_URL='mysql://zcvz5mpa0mku4a1wrhmr:pscale_pw_z55WN8fUijvuNvIk2MutRQIqMyt3tWYsyzsHMZ77hp@aws.connect.psdb.cloud/mysql-db1?ssl={"rejectUnauthorized":true}')


//Variables para conectarse a mysql
//const mysql = require('mysql2')
//const connection = mysql.createConnection('mysql://4eme3kqqx4ueltv2mfzj:pscale_pw_L5cO1mxvZ83BMQUwcEYLLMWdEPBPMkrbQE7nB9TEK7t@us-east.connect.psdb.cloud/project?ssl={"rejectUnauthorized":true}')


async function subirFoto(foto){
    connection.query(`INSERT INTO comments(name) VALUES('Hola',${foto})`);
    console.log('upload correctly!');
}
subirFoto();


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

// # # # # # # # VALUES HTML # # # # # # #

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/SignIn.html');
});

app.get('/Register',(req,res)=>{
    res.sendFile(__dirname+'/public/Register.html');
});

app.get('/Home',(req,res)=>{
    res.sendFile(__dirname+'/public/Home.html');
});

app.get('/SearchDatasets',(req,res)=>{
    res.sendFile(__dirname+'/public/SearchDatasets.html');
});

app.get('/SearchUsers',(req,res)=>{
    res.sendFile(__dirname+'/public/SearchUsers.html');
});

app.get('/MyDatasets',(req,res)=>{
    res.sendFile(__dirname+'/public/MyDatasets.html');
});

app.get('/CreateDataset',(req,res)=>{
    res.sendFile(__dirname+'/public/CreateDataset.html');
});

app.get('/ViewDataset',(req,res)=>{
    res.sendFile(__dirname+'/public/ViewDataset.html');
});

app.get('/ViewUser',(req,res)=>{
    res.sendFile(__dirname+'/public/ViewUser.html');
});

app.get('/Conversations',(req,res)=>{
    res.sendFile(__dirname+'/public/Conversations.html');
});

app.get('/Messages',(req,res)=>{
    res.sendFile(__dirname+'/public/Messages.html');
});

app.get('/MyProfile',(req,res)=>{
    res.sendFile(__dirname+'/public/MyProfile.html');
});



// # # # # # # # END VALUES # # # # # # #


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
//Querys MongoDB.
const createUserMongo = () => {
    User.create(
        {
            Username: 'YisusHelp',
            Password: '123',
            FirstName: 'Esteban',
            FirstSurname: 'Arias',
            BirthDate: '2002-02-20',
            PhotoUser: null,
        }
    )
    
}

const createDataset = () => {
    DataTransferItem.create(
        {
            Name: 'Repository',
            Description: 'Hola mundo.',
            DataSets: Array,
            DateOfInsert: '2002-02-20',
            PhotoDataset: null,
        }
    )
}


// Busca solo 1 elemento.
const searchUserById = async () => {
    const userdb = await user.findById('64122d7e02969be4b59c6b29')
    console.log('EL usuario es: ', userdb);
}


// Traerá solo 1, aunque hayan con más archivos con el mismo nombre.
const searchByOne = async () => {
    const userdb = await user.findOne({
        username: 'nottwithtt'
    })

    console.log('El usuario encontrado es: ', userdb);
}


// Busca todos los usuarios con el mismo nombre.
const searchAllUsersEqualsName = async () => {
    const userdb = await userdb.find({
        FirstName: {
            $eq: 'Tamara'
        }
    })

    console.log('Los usuarios encontrados con este nombre son: ', userdb);
}

// Busca todos los usuarios con el mismo apellido.
const searchAllUsersEqualsSurname = async () => {
    const userdb = await userdb.find({
        FirstSurname: {
            $eq: 'Leiva'
        }
    })

    console.log('Los usuarios encontrados con este apellido son: ', userdb);
}


// Busca solo 1 elemento.
const searchDataSetById = async () => {
    const datasetdb = await dataSet.findById('64122e74bcbc54d0eb9087b3')
    console.log('El Dataset es: ', datasetdb);
}

// Busca todos por ese atributo en el documento.
// Ejemplo si hay 3 documentos que tienen el nombre: Ardilla, los traerá.
const searchAllDataSetByName = async () => {
    const datasetdb = await dataSet.find({
        name: {
            $eq: 'Indicaciones del proyecto.'
        }
    })

    console.log('Los dataset encontrados con este nombre son:', datasetdb);
}

// Busca todos por ese atributo en el documento.
// Ejemplo si hay 3 documentos que tienen el nombre: Ardilla, los traerá.
const searchAllDataSetByDescription = async () => {
    const datasetdb = await dataSet.find({
        Description: {
            $eq: 'Asuntos corelacionados al tema en cuestion.'
        }
    })

    console.log('Los dataset encontrados con esta descripción son:', datasetdb);
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

async function connectToRedis() {
  
  /*await client.hset('Comentarios',{'user1': '12345',Map<string | Number>;
  let x = await client.get(foo);
  console.log(x);*/

  //createConversation('1234', '12345');
  //createMessage('con-1','2312','Bueno Papiola','none');
  //let conver = consultConversation(client,'1234','4321');
  //console.log(conver);
  //let list = await consultConversationsOfUser('1234');
  //console.log(list);

  let conversations = await consultConversationsOfUser('1234');
  console.log(conversations);
  
}

/*
  Function that creates a conversation between two users and verifies that it is not created.
*/
async function createConversation(idUser1,idUser2){
  if(idUser1 != idUser2){
    let x = await client.keys('*');
    let isCreate = false;
    let idExistConversation = '';
    
    for(let i = 0; i < x.length;i++){
      let keyName = x[i];
      if (keyName.substring(0,3) == 'con'){
        
        let u1 = await client.hget(x[i],'user1');
        let u2 = await client.hget(x[i],'user2');
      
        if((u1 == idUser1 && u2 == idUser2) || (u1 == idUser2 && u2 == idUser1)){
          isCreate = true;
          idExistConversation = x[i];
          break;
        }
      }   
    }
  
  
    if(isCreate == false){
      let i = 0;
      let name = 'con-';
  
      while(await client.exists(name+i) == true){
          i += 1;
      }
      name = name + i;
      await client.hmset(name,'user1',idUser1,'user2', idUser2);
      return name;
   }
   else{
      loadConversation(idExistConversation);
   }
  }
}

/* 
Function that creates a message in a conversation with a specified id 
*/
async function createMessage(conversation,idAuthor,content,image){
  let name = 'mes-' + conversation + '-';
  let i = 0;

  while(await client.exists(name+i) == true){
    i += 1;
  }
  name = name + i;
  await client.hmset(name,'idAuthor',idAuthor,'content',content,'image',image);
}


/*
Consult name to Conversation of two users
*/
async function consultConversation(idUser1, idUser2){
  let x = await client.keys('*');
  let nameConversation = '';

  for(let i = 0; i < x.length;i++){
    let keyName = x[i];
    if (keyName.substring(0,3) == 'con'){
      let u1 = await client.hget(x[i],'user1');
      let u2 = await client.hget(x[i],'user2');
      if(u1 == idUser1 && u2 == idUser2){
        nameConversation = x[i];
        break;
      }   
    }
  }
  return nameConversation;
}

async function consultConversationsOfUser(idUser){
  let x = await client.keys('*');
  let conversationsUser = new Map();


  for(let i = 0; i < x.length ; i++){
    let keyName = x[i];
    if (keyName.substring(0,3) == 'con'){
      let key = x[i];
      let u1 = await client.hget(key,'user1');
      let u2 = await client.hget(key,'user2');
      if(idUser == u1 || idUser == u2){
        conversationsUser.set(key,{"user1":u1,"user2":u2});
      }
    }
  }
  return conversationsUser;
}

async function loadMessages(idConversation){
    let mapMessages = new Map();
    
    let keyName = 'mes-' + idConversation + '-';
    let i = 0;
    let x = await client.hvals(keyName + i);

    while(x.length != 0){
      let x1 = await client.hget(keyName+i,"idAuthor");
      let x2 = await client.hget(keyName+i,"content");
      let x3 = await client.hget(keyName+i,"image");

      mapMessages.set(i,{"idAuthor": x1, "content": x2, "image": x3});
      i ++;
      x = await client.hvals(keyName + i);
    }

    return mapMessages;

    /*mapMessages.set(0,{'idAuthor': '1234','content':'Hola'});
    let mapMessage = mapMessages.get(0);
    console.log(mapMessage['hola']);*/

}
