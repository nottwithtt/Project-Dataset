const parameters = new URLSearchParams(window.location.search);
const actualUser = parameters.get("actualUser");
const otherUser = parameters.get("otherUser");
const conver = parameters.get("conver");
const appendTo = document.getElementById("messages");
let urlPhotoUser = "";

async function createMessage(){
    const content = document.getElementById("txtContent").value;
    const file = document.getElementById("formFile").files[0];
    if(file&&content){
        const formData = new FormData();
        formData.append('file',file);
        const uploadFile = await fetch("/uploadMessageFile",{
            method: "POST",
            body: formData
        })
        let responseServer = await uploadFile.json();
        let idFile = responseServer.idFile;
        console.log(idFile);

        const response = await fetch('/createMessage',{
            method: "POST",
            body: JSON.stringify({user:actualUser,
                                  idConver:conver,
                                  content: content,
                                  idFile:idFile}),
            headers: {
                "Content-Type": "application/json",
            },
        })
    
        let responseObject = await response.json();
        let message = responseObject.message;
    }
    else if (file&&!content){
        const formData = new FormData();
        formData.append('file',file);
        const uploadFile = await fetch("/uploadMessageFile",{
            method: "POST",
            body: formData
        })
        let responseServer = await uploadFile.json();
        let idFile = responseServer.idFile;
        console.log(idFile);

        const response = await fetch('/createMessage',{
            method: "POST",
            body: JSON.stringify({user:actualUser,
                                  idConver:conver,
                                  content: null,
                                  idFile:idFile}),
            headers: {
                "Content-Type": "application/json",
            },
        })
    
        let responseObject = await response.json();
        let message = responseObject.message;
    }
    else{
        const response = await fetch('/createMessage',{
            method: "POST",
            body: JSON.stringify({user:actualUser,
                                  idConver:conver,
                                  content: content,
                                  idFile:null}),
            headers: {
                "Content-Type": "application/json",
            },
        })
    
        let responseObject = await response.json();
        let message = responseObject.message;
        //console.log(message);
    }
    await loadMessages();
}

async function loadMessages () {
    await loadImageMessages();

    //eliminar los mensajes actuales
    appendTo.innerHTML = ``;
    //Traer los mensajes de la base de datos
    const response = await fetch('/getMessagesConversation',{
        method: "POST",
        body: JSON.stringify({conversation: conver}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    let responseObject = await response.json();
    let messages = responseObject.messages;
    let lenMessages = Object.keys(messages).length;

    console.log(messages);


    for(let i = 0; i < lenMessages;i++ ){
        let mes = messages[i];
        if(mes["idAuthor"] == actualUser){
            console.log("hola");
            await createRightMessageBox(mes);
        }
        else{
            await createLeftMessageBox(mes);
        }
    }
}

async function createRightMessageBox(message){
    const divPrincipal = document.createElement('div');

    const content = message["content"];
    const idFile = message["file"];
    let fileMessage = null;
    let displayContent = "block";
    let displayContentFile = "block";
    

    if(content == ""){
        displayContent = "none";
    }

    if(idFile == ""){
        displayContentFile = "none";
    }
    else{
        console.log(idFile);
        fileMessage = await loadFile(idFile);
    }
    console.log("se cayo aqui");

    divPrincipal.classList = "col-12 d-flex flex-row justify-content-end";
    if (displayContentFile == "none"){
        divPrincipal.innerHTML = `
        <div class="card bg-primary text-white d-flex flex-row mt-3" style="width: auto; height: auto; margin-right: 7vw;">
            <h6 style="margin-top: 0.8vw; margin-bottom: 0.8vw; margin-left: 0.5vw; margin-right: 0.5vw; display: ${displayContent};">${content}</h6>
        </div>
        `
    }
    else if(fileMessage.type == "image/png" || fileMessage.type == "image/jpeg"){
        divPrincipal.innerHTML = `
        <div class="card bg-primary text-white d-flex flex-row mt-3" style="width: auto; height: auto; margin-right: 7vw;">
            <div class="d-flex flex-column">
                <div>
                    <h6 style="margin-top: 0.8vw; margin-bottom: 0.8vw; margin-left: 0.5vw; margin-right: 0.5vw; display: ${displayContent};">${content}</h6>
                </div>
                <div class="d-flex justify-content-center">
                    <img src=${fileMessage.url} style="max-width: 15vw; border-radius: 10%; display: ${displayContentFile}">
                </div>
            </div>
        </div>
        `
    }
    else if(fileMessage.type == "video/mp4"){
        divPrincipal.innerHTML = `
        <div class="card bg-primary text-white d-flex flex-row mt-3" style="width: auto; height: auto; margin-right: 7vw;">
            <div class="d-flex flex-column">
                <div>
                    <h6 style="margin-top: 0.8vw; margin-bottom: 0.8vw; margin-left: 0.5vw; margin-right: 0.5vw; display: ${displayContent};">${content}</h6>
                </div>
                <div class="embed-responsive embed-responsive-16by9">
                    <video class="embed-responsive-item" controls>
                    <source src=${fileMessage.url} type="video/mp4">
                    </video>
                </div>
            </div>
        </div>
        `
    }
    
    

    appendTo.appendChild(divPrincipal);
}

async function createLeftMessageBox(message){
    const divPrincipal = document.createElement('div');

    const content = message["content"];
    const idFile = message["file"];
    let fileMessage = null;
    let displayContent = "block";
    let displayContentFile = "block";
    

    if(content == ""){
        displayContent = "none";
    }

    if(idFile == ""){
        displayContentFile = "none";
    }
    else{
        console.log(idFile);
        fileMessage = await loadFile(idFile);
    }
    
    divPrincipal.classList = "col-12 d-flex flex-row justify-content-start";
    if (displayContentFile == "none"){
        divPrincipal.innerHTML = `
        <div class="card bg-light text-dark d-flex flex-row mt-3" style="width: auto; height: auto; margin-left: 7vw;">
            <div>
                <img src=${urlPhotoUser} style="height: 2vw; width: 2vw; border-radius: 50%;">
            </div>
            <div>
                <h6 style="margin-top: 0.8vw; margin-bottom: 0.8vw; margin-left: 0.5vw; margin-right: 0.5vw; display: ${displayContent};">${content}</h6>
            </div>
        </div>
        `
    }
    else if(fileMessage.type == "image/png" || fileMessage.type == "image/jpeg"){
        divPrincipal.innerHTML = `
        <div class="card bg-light text-dark d-flex flex-row mt-3" style="width: auto; height: auto; margin-left: 7vw;">
            <div class="mt-1 mx-1">
                <img src=${urlPhotoUser} style="height: 2vw; width: 2vw; border-radius: 50%">
            </div>
            <div class="d-flex flex-column">
                <div>
                    <h6 style="margin-top: 0.8vw; margin-bottom: 0.8vw; margin-left: 0.5vw; margin-right: 0.5vw; display: ${displayContent};">${content}</h6>
                </div>
                <div class="d-flex justify-content-center">
                    <img src=${fileMessage.url} style="max-width: 15vw; border-radius: 10%; display: ${displayContentFile}">
                <div>
            </div>
        </div>
        `
    }
    else if(fileMessage.type == "video/mp4"){
        divPrincipal.innerHTML = `
        <div class="card bg-light text-dark d-flex flex-row mt-3" style="width: auto; height: auto; margin-left: 7vw;">
            <div class="mt-1 mx-1">
                <img src=${urlPhotoUser} style="height: 2vw; width: 2vw; border-radius: 50%">
            </div>
            <div class="d-flex flex-column">
                <div>
                    <h6 style="margin-top: 0.8vw; margin-bottom: 0.8vw; margin-left: 0.5vw; margin-right: 0.5vw; display: ${displayContent};">${content}</h6>
                </div>
                <div class="embed-responsive embed-responsive-16by9">
                    <video class="embed-responsive-item" controls>
                    <source src=${fileMessage.url} type="video/mp4">
                    </video>
                </div>
            </div>
        </div>
        `
    }


    appendTo.appendChild(divPrincipal);
}

async function loadFile(idFile){
    console.log("entra");
    const response = await fetch('/getPhotoUser',{
        method: "POST",
        body: JSON.stringify({photo: idFile}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const blob = await response.blob();

    console.log(blob.type);
    const url = URL.createObjectURL(blob);
    
    return {url:url,type:blob.type};
}


async function loadImageMessages(){
    console.log(otherUser);
    const idPhoto = await getOtherUser();
    console.log(idPhoto);

    const response = await fetch('/getPhotoUser',{
        method: "POST",
        body: JSON.stringify({photo: idPhoto}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const blob = await response.blob();
    console.log(blob);
    const url = URL.createObjectURL(blob);

    const photo = document.getElementById("photoUser");
    photo.src = url;
    urlPhotoUser = url;

}

async function getOtherUser(){
    const response = await fetch('/getUser',{
        method: "POST",
        body: JSON.stringify({idUser: otherUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let responseObject = await response.json();

    let user = responseObject.user;
    document.getElementById("username").innerHTML = user[0].username;

    return user[0].photo;
}



