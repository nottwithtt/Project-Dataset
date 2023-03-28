
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

    updateActiveUser(name,lastName,username,birthday,photo);
}
