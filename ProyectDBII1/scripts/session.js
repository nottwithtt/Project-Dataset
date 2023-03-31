// Using onload ="" can call a function when a window is opened

function exampleSession(){
    updateActiveUser("Jonathan", "Porras", "jonathanps2110","21/10/2003","mkskamska");
}

function updateActiveUser(name,lastName,username,birthday,photo){
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("birthday", birthday);
    sessionStorage.setItem("photo", photo);
}

function updateInactiveUser(name,lastName,username,birthday,photo){
    activeUser.clear();
}

function editActiveUser(idUser,name,lastName,password,photo){
    sessionStorage.clear();
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("birthday", birthday);
    sessionStorage.setItem("photo", photo);
}

