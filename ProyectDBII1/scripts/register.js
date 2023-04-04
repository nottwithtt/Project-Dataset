// Functions of Register.html

async function ChangeRegisterImage (){
    
    const newImage = document.getElementById("buttonUploadFilePhotoRegister").files[0];
    const imagePreview = document.getElementById("filePhotoRegister");
 
    if (newImage) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          imagePreview.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(newImage);
    }
}

/* Change a photo in the circle in the interface */
/* async function ChangeRegisterImage(){
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
} */

/* Function that verify the information of the new user and register in the database*/
async function Register(event){
    event.preventDefault();
    const users = await fetch('/getUsers',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    let response = await users.json();
    let usersArray = response.answer;
    console.log(usersArray);
    let name = document.getElementById("txtNameRegister").value;
    let lastName = document.getElementById("txtLastNameRegister").value;
    let username = document.getElementById("txtUsernameRegister").value;
    let birthday = document.getElementById("txtBirthdayRegister").value;
    let password = document.getElementById("txtPasswordRegister").value;
    let photo = document.getElementById("buttonUploadFilePhotoRegister").files[0];

    console.log(name);
    console.log(lastName);
    console.log(username);
    console.log(birthday);
    console.log(password);
    console.log(photo);
    if (RegisterRestrictions(usersArray,username)&&name&&username&&lastName&&birthday&&photo&&password){
        console.log("Verdad");
        //Segmento que devuelve el id de la foto;
        const formData = new FormData();
        formData.append('photoUser',photo);
        const response = await fetch("/uploadUserPhoto",{
            method: "POST",
            body: formData
        })
        let responseServer = await response.json();
        let idPhoto = responseServer.idPhoto;
        console.log(idPhoto);

        //Segmento que encripta la contraseña
        const responsePassword = await fetch("/encryptPasswordRegister",{
            method: "POST",
            body: JSON.stringify({pass: password}),
            headers: {
                "Content-Type": "application/json",
            },
        })

        let responseServerPassword = await responsePassword.json();

     
        //Trae la contra ya encriptada con hash y salt.
        let encryptedPassword = responseServerPassword.encrypted;
        console.log(encryptedPassword);

        const user = await fetch('/insertUser',{
            method: "POST",
            body: JSON.stringify({
                name: name,
                lastName: lastName,
                username: username,
                birthday: birthday,
                photo: idPhoto,
                password: encryptedPassword
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseUserArray = await user.json();
        

        let responseUser = responseUserArray.user[0];

        
         //const idUser = createUser(name,lastname,username,birthday,photo);
        //Ver como sacamos el objeto de la foto
        updateActiveUser(responseUser._id,responseUser.firstName,responseUser.firstSurname,responseUser.username,responseUser.birthDate,responseUser.photo);
        window.location.href ="/Home";
        // Insert the password and infoUser in the database.
        // RegisterUser(name,lastName,username,birthday,idPhoto); 
    
        
    }else{
        window.location.href = "/Register"
    }
}


function RegisterRestrictions(usersArray,username){
    for(let i =0;i<usersArray.length;i++){
        if(usersArray[i].username==username) return false;
    }
    return true;
}