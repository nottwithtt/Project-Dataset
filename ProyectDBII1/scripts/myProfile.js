
const idPhoto = sessionStorage.getItem('photo');
const idUser = sessionStorage.getItem('id');
const userFirstName = sessionStorage.getItem('name');
const userLastName = sessionStorage.getItem('lastName');
const userName = sessionStorage.getItem('username');
const birthday = sessionStorage.getItem('birthday');


const dateObj = new Date(birthday);
const formattedDate = dateObj.toISOString().substring(0, 10);


document.getElementById("txtIdUser").value = idUser;
document.getElementById("txtName").value = userFirstName;
document.getElementById("txtLastName").value = userLastName;
document.getElementById("profileBirthdayDate").value = formattedDate;
document.getElementById("profileUsername").textContent =userName;


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

async function ChangeImageProfile(){
    
    const newImage = document.getElementById("buttonUploadPhotoProfile").files[0];
    const imagePreview = document.getElementById("profilePhoto");
 
    if (newImage) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          imagePreview.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(newImage);
    }
}

async function saveChanges(ActionButton){
    if (ActionButton == "btnSaveChanges"){
        let txtPassword = document.getElementById("txtPassword").value;
        let name = document.getElementById("txtName").value;
        let lastName = document.getElementById('txtLastName').value;
        let replyPassword = document.getElementById("txtReplyPassword").value;
        let photo = document.getElementById("buttonUploadPhotoProfile").files[0];

        if(txtPassword&&replyPassword&&txtPassword==replyPassword){
            const responsePassword = await fetch("/encryptPasswordRegister",{
                method: "POST",
                body: JSON.stringify({pass: txtPassword}),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            let responseServerPassword = await responsePassword.json();

            //Trae la contra ya encriptada con hash y salt.
            let encryptedPassword = responseServerPassword.encrypted;

            let result = await fetch('/updatePasswordUser',{
                method: "POST",
                body: JSON.stringify({username: userName,
                    pass: encryptedPassword}),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            let formatedResult = await result.json();

        }else{
            //Codigo a implementar de aviso
        }

        if(name){
            let result = await fetch('/updateNameUser',{
                method: "POST",
                body: JSON.stringify({username: userName,
                    name: name}),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            let formatedResult = await result.json();

            sessionStorage.setItem("name",name);
        }

        if(lastName){
            let result = await fetch('/updateLastNameUser',{
                method: "POST",
                body: JSON.stringify({username: userName,
                    lastName: lastName}),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            let formatedResult = await result.json();

            sessionStorage.setItem("lastName",lastName);
        }

        if(photo){
            const formData = new FormData();
            formData.append('photoUser',photo);
            const response = await fetch("/uploadUserPhoto",{
            method: "POST",
            body: formData
            })
            let responseServer = await response.json();
            let idPhotoUpdate = responseServer.idPhoto;

            const responseUpdate = await fetch('/updatePhotoIdUser',{
                method: "POST",
                body: JSON.stringify({username: userName,photo: idPhotoUpdate}),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            let formatedResult = await responseUpdate.json();

            sessionStorage.setItem("photo",idPhotoUpdate);
        }
        /*Dectivate the button SaveChanges*/
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

