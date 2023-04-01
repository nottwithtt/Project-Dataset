// Functions of Register.html



/* Change a photo in the circle in the interface */
function ChangeRegisterImage(){
    const file = document.getElementById("buttonUploadFilePhotoRegister").files[0];
    const img = URL.createObjectURL(file);
    subirFoto(img);
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