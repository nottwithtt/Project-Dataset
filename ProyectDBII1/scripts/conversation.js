

async function loadConversations () {
    /* functions to get all Conversations */
    /* for cicle to get the conversations one by one */
    await loadPhotoUser();

    const idActualUser = sessionStorage.getItem("id");

    const response = await fetch('/getConversationsOfUser',{
        method: "POST",
        body: JSON.stringify({idUser: idActualUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let responseObject = await response.json();
    let conversations = responseObject.conver;
    let keysConversations = Object.keys(conversations);

    //console.log(Object.entries(conversations)[0][1]['user1']);
    //console.log(Object.entries(conversations)[1][1]);
    let i = 0;
    for(i = 0; i < keysConversations.length; i++){
        if(Object.entries(conversations)[i][1]['user1'] == idActualUser){
            await createBox(i,idActualUser, Object.entries(conversations)[i][1]['user2']);
        }
        else{
            await createBox(i,idActualUser,Object.entries( conversations)[i][1]['user1']);
        }
    }

}



async function createBox(i, actualUser, idOtherUser){

    const response = await fetch('/getUser',{
        method: "POST",
        body: JSON.stringify({idUser: idOtherUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let responseObject = await response.json();

    let user = responseObject.user;
    
    //Info User
    const idPhotoUser = user[0].photo;
    const username = user[0].username;
    
    //const photoUser = await uploadPhoto (idPhotoUser);

    //Agregar nuevo cuadro de conversacion
    const appendTo = document.querySelector("#conversationBoxesDiv");

    const divPrincipal = document.createElement('div');
    divPrincipal.classList = "d-flex justify-content-start";
    divPrincipal.style = "border-radius: 6px; margin-bottom: 1vw; width: 75vw;";
    divPrincipal.innerHTML = `
    <a href="Messages?actualUser=${actualUser}&otherUser=${idOtherUser}" class="d-flex flex-row list-group-item list-group-item-action">
        
        <div> <img id= "${idOtherUser}" src="" style="border-radius: 50%; width: 2.7vw; height: 2.7vw; margin-right: 1vw;"> </div>
        
        <div> <p class="h5 mt-2">${username}</p> </div>
    </a>
    `

    appendTo.appendChild(divPrincipal);

    const photoUser = document.getElementById(idOtherUser);
    loadImageConver(photoUser, idPhotoUser);
}

async function loadImageConver(photoUser, idPhoto){

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

    photoUser.src= url;
}

async function createNewConversationBox() {

    const modal = document.getElementById("conversationModal");

    //Users
    const actualUser = sessionStorage.getItem("id");
    const otherUser = '642bd04620f9e4e0ca49a286';

    const conversation = await createConversation(actualUser,otherUser);

    
    if (conversation.isCreate == false){
        const appendTo = document.querySelector("#conversationBoxesDiv");

        //obtenerInformacionUsuario
        const response = await fetch('/getUser',{
            method: "POST",
            body: JSON.stringify({idUser: otherUser}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        let responseObject = await response.json();
        let user = responseObject.user;
    
        //Info User
        const idPhotoUser = user[0].photo;
    
        //const photoUser = await uploadPhoto (idPhotoUser);
        const photoUser = "../Images/Icons/noImage.jpg";
        const username = user[0].username;
    
        const divPrincipal = document.createElement('div');
        divPrincipal.classList = "d-flex justify-content-start";
        divPrincipal.style = "border-radius: 6px; margin-bottom: 1vw; width: 75vw;";
        divPrincipal.id = otherUser;
        divPrincipal.innerHTML = `
        <a href="Messages?actualUser=${actualUser}&otherUser=${otherUser}" class="d-flex flex-row list-group-item list-group-item-action">
            
            <div> <img src=${photoUser} style="border-radius: 50%; width: 2.7vw; height: 2.7vw; margin-right: 1vw;"> </div>
            
            <div> <p class="h5 mt-2">${username}</p> </div>
        </a>
        `
        appendTo.appendChild(divPrincipal);
    }
    else{
        //presente un mensaje de error
    }


    // Close the modal Window
    bootstrap.Modal.getInstance(modal).hide();
}

async function uploadPhoto (idPhoto){
    const response = await fetch('/getPhoto',{
        method: "POST",
        body: JSON.stringify({data: "64277f67adeb58cdfe1fe141"}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const blob = await response.blob();
    console.log(blob);
    const url = URL.createObjectURL(blob);

    return url;
}

async function createConversation(user1,user2){
    const response = await fetch('/createConversation',{
        method: "POST",
        body: JSON.stringify({actualUser: user1, otherUser: user2}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let responseObject = await response.json();
    return responseObject.res;
}