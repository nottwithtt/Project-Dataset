// Functions of Register.html



/* Change a photo in the circle in the interface */
async function ChangeRegisterImage(){
    const formData = new FormData();
    const file = document.getElementById("buttonUploadFilePhotoRegister").files[0];
    formData.append('photo',file);
    const response = await fetch("/uploadCommentFile",{
        method: "POST",
        body: formData
    })
    const img = URL.createObjectURL(file);
    let responseServer = await response.json();
    document.getElementById("filePhotoRegister").src= img;
}

/* Function that verify the information of the new user and register in the database*/
function Register(){
    const id = "1234";
    const name = document.getElementById("txtNameRegister").value;
    const lastName = document.getElementById("txtLastNameRegister").value;
    const username = document.getElementById("txtUsernameRegister").value;
    const birthday = document.getElementById("txtBirthdayRegister").value;
    const photo = document.getElementById("buttonUploadFilePhotoRegister").files[0];

    if (!RegisterRestrictions()){
        //const idUser = createUser(name,lastname,username,birthday,photo);
        //Ver como sacamos el objeto de la foto
        updateActiveUser(id,name,lastName,username,birthday,photo)
        window.location.href ="/Home";
        // Insert the password and infoUser in the database.
        // RegisterUser(name,lastName,username,birthday,idPhoto);
    
        
    }

}

function CreateUser(){

}


function RegisterRestrictions(){
    
}