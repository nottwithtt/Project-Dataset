src="session.js";

function changeRegisterImage(){

    var file = document.getElementById("buttonUploadRegisterPhoto").files[0];
    var img = URL.createObjectURL(file);

    document.getElementById("registerPhoto").src= img;
}

function register(){
    let name = document.getElementById("registerNameTxt").value;
    let lastName = document.getElementById("registerLastNameTxt").value;
    let username = document.getElementById("registerUsernameTxt").value;
    let birthday = document.getElementById("registerBirthdayDate").value;
    let photo = "1234";
    
    // Insert the password and infoUser in the database.
    // createUser(name,lastName,username,birthday,photo);

    updateActiveUser(name,lastName,userName,birthday,photo);

}