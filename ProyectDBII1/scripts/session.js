// Using onload ="" can call a function when a window is opened

function exampleSession(){
    updateActiveUser("90219029190","Jonathan", "Porras", "jonathanps2110","21/10/2003","mkskamska");
}

function updateActiveUser(id,name,lastName,username,birthday,photo){
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("birthday", birthday);
    sessionStorage.setItem("photo", photo);
}

function InactiveUser(){
    sessionStorage.clear();
}

function editActiveUser(idUser,name,lastName,password,photo){
    // Update the information of user in the database
    // editInfoUser(idUser,name,lastName,password,photo);
    sessionStorage.removeItem(name);
    sessionStorage.removeItem(lastName);
    sessionStorage.removeItem(username);
    sessionStorage.removeItem(photo);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("photo", photo);
}

