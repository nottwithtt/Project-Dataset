/*const Redis = require("ioredis");

let client = new Redis("rediss://default:228bf14338b04f2f8e5d1c195c14c066@us1-loving-yeti-40204.upstash.io:40204");
client.set("1234", 'jonathan');*/


/*
const Redis = require("ioredis");

async function connectToRedis() {
  let client = new Redis("redis://default:96da981bc32946198e3df7c7e856c742@profound-shepherd-33303.upstash.io:33303");
  await client.set('foo', 'bar');
  let x = await client.get('foo');
  console.log(x);
}
*/

const Redis = require("ioredis");

let client = new Redis("redis://default:b953727216e840ba8c2590cb8b4ceeee@usw1-ruling-falcon-34023.upstash.io:34023");

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
  let mapa = await loadConversation('con-1');
  console.log(mapa);
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
  let nameConversation = [];

  
  for(let i = 0; i < x.length;i++){
    let keyName = x[i];
    if (keyName.substring(0,3) == 'con'){
      let u1 = await client.hget(x[i],'user1');
      let u2 = await client.hget(x[i],'user2');
      if(idUser == u1 || idUser == u2){
        nameConversation.push(x[i]);
      }
    }
  }
  return nameConversation;
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


connectToRedis();