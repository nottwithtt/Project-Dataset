
function changeInfoUser(){
    let homeUser = document.getElementById('usernameHome');
    homeUser.innerText = sessionStorage.getItem("username");
    console.log(sessionStorage.getItem("id"));
}
