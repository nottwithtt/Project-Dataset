const idPhoto = sessionStorage.getItem('photo');
const idUser = sessionStorage.getItem('id');

async function uploadPhoto (){
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

    const newImage = document.createElement('img');
    const container = document.getElementById("containerPhoto");
    newImage.id = "profilePhoto";
    newImage.src = url;
    newImage.style = "width: 8vw; height: 8vw;border-radius: 50%;"
    container.appendChild(newImage);
    

}

uploadPhoto();

async function getFollowingUsers(){
    const response = await fetch('/getFollowedUsers',{
        method: "POST",
        body: JSON.stringify({user: idUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let users = answer.users;
    console.log(users);
    let container = document.getElementById("followedUsers");
    for(let i =0;i<users.length;i++){
        let divPrincipal = document.createElement('div');
        divPrincipal.classList.add("row", "d-flex", "flex-row" ,"justify-content-between");
        divPrincipal.id = users[i].id_mongo;
        divPrincipal.innerHTML = `<h6>${users[i].username}</h6>
                                      <hr>`;
        divPrincipal.onclick = divPrincipal.onclick =  function() {
            viewClickedProfile(users[i].id_mongo);
        }
        container.appendChild(divPrincipal);
    }
    let counterNumber = users.length;
    let containerCounter = document.getElementById("containerCounter");
    let textCounter = document.createElement('p');
    textCounter.textContent = `${counterNumber}`;
    textCounter.style = "font-size:larger;";
    containerCounter.appendChild(textCounter);

}

getFollowingUsers();



async function getFollowedUsers(){
    const response = await fetch('/getFollowingUsers',{
        method: "POST",
        body: JSON.stringify({user: idUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let users = answer.users;
    console.log(users);
    let container = document.getElementById("followingUsers");
    for(let i =0;i<users.length;i++){
        let divPrincipal = document.createElement('div');
        divPrincipal.classList.add("row", "d-flex", "flex-row" ,"justify-content-between");
        divPrincipal.id = users[i].id_mongo;
        divPrincipal.innerHTML = `<h6>${users[i].username}</h6>
                                      <hr>`;
        divPrincipal.onclick =  function() {
            viewClickedProfile(users[i].id_mongo);
        }
        container.appendChild(divPrincipal);
    }
    let counterNumber = users.length;
    let containerCounter = document.getElementById("containerFollowers");
    let textCounter = document.createElement('p');
    textCounter.textContent = `${counterNumber}`;
    textCounter.style = "font-size:larger;";
    containerCounter.appendChild(textCounter);

}

getFollowedUsers();

function viewClickedProfile(element){
    console.log(element);
}

function editProfile(ActionButton){
    if (ActionButton == "btnEditProfile"){
        /*Active the button SaveChanges*/
        document.getElementById('btnSaveChanges').style.display='block';
        /*Desactive the button EditProfile*/
        document.getElementById('btnEditProfile').disabled=true;
        /*Active upload Photo button*/
        document.getElementById('buttonUploadPhotoProfile').style.display='block';
        /*Active the text field Reply Password*/
        document.getElementById('actionReplyPassword').style.display='block';
        /*Active fields*/
        document.getElementById('txtName').disabled=false;
        document.getElementById('txtLastName').disabled=false;
        document.getElementById('txtPassword').disabled=false;
        document.getElementById('txtReplyPassword').disabled=false;
        
    }    
}


function saveChanges(ActionButton){
    if (ActionButton == "btnSaveChanges"){
        /*Desactive the button SaveChanges*/
        document.getElementById('btnSaveChanges').style.display='none';
        /*Active the button EditProfile*/
        document.getElementById('btnEditProfile').disabled=false;
        /*Desactive the upload Photo Button*/
        document.getElementById('buttonUploadPhotoProfile').style.display='none';

        /*Desactive the text field Reply Password*/
        document.getElementById('actionReplyPassword').style.display='none';
        /*Active fields*/
        document.getElementById('txtName').disabled=true;
        document.getElementById('txtLastName').disabled=true;
        document.getElementById('txtPassword').disabled=true;
        document.getElementById('txtReplyPassword').disabled=true;
    }    

}

