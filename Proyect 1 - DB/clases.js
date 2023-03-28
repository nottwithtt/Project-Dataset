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


/* Functions of Sign In */

function signIn(){
    let username = document.getElementById('txtUsernameSignIn');
    let password = document.getElementById('txtPasswordSignIn');
    exampleSession();
    let authorizeCorrect = true;
    // Verify in the database Password and User

    if (authorizeCorrect){
        window.location.href ="Home.html";
        //Save userMongoId
    }
}

function authorizeAccess(){
    
}

/* Functions of Register */


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


/* Functions of Home */

function filterChange(filterUser){
    let filter = document.getElementById('navFilterDropdown');

    if(filterUser == "Users")
        filter.innerHTML = 'Users';
    if(filterUser == "NameDataset")
        filter.innerHTML = 'Name Dataset';
    if(filterUser == "DescriptionDataset")
        filter.innerHTML = 'Description Dataset';
    if(filterUser == "None")
        filter.innerHTML = 'Filter';
}

function changeInfoUser(){
    let homeUser = document.getElementById('homeUsername');
    homeUser.innerText = sessionStorage.getItem("username");
}


/* Function of My Dataset Page */

function loadMyDataSets(){

}

/* Function to Create a Dataset */

function createDataBase() {
    let datasetName =  document.getElementById("txtNameDataset");
    let datasetDescription = document.getElementById("txtDescriptionDataset");
    let datasetImage = document.getElementById("imageDataset");
    let datasetFiles = document.getElementById("fileDataset");
}


/* Functions for Conversations */

function loadConversations () {
    /* functions to get all Conversations */
    /* for cicle to get the conversations one by one */
    createNewConversationBox(); // (inside the for) create a box for each conversation
}

function createNewConversationBox() {

    const boxesDiv = document.querySelector("#conversationBoxesDiv");
    const convBox = document.querySelector("#conversationBox");
    const newConvBox = convBox.cloneNode(true);

    const usernameText = newConvBox.querySelector("p");
    //const imageBox = newConvBox.querySelector("img");

    usernameText.textContent= "New User";
    //imageBox.src = newImage;

    boxesDiv.appendChild(newConvBox);
}


/* Functions for Messages */

function loadMessages () {

}

function createNewMessageBox() {

    const messagesDiv = document.querySelector("#messagesDiv");
    const rightMessageBox = document.querySelector("#rightMessage");
    const leftMessageBox = document.querySelector("#leftMessage");

    /* call function to validate the user, depending of it, the box is printed on the right or left */

    // Right Messages
    const newRightMessageBox = rightMessageBox.cloneNode(true);

    const rightMessageContent = newRightMessageBox.querySelector("p");
    rightMessageContent.textContent = "Right Message Content";

    messagesDiv.appendChild (newRightMessageBox);

    // Left Messages

    const newLeftMessageBox = leftMessageBox.cloneNode(true);

    const leftMessageContent = newLeftMessageBox.querySelector("p");
    leftMessageContent.textContent = " Left Message Content";

    messagesDiv.appendChild (newLeftMessageBox);

}





  
/* Functions of Profile */
function editProfile(ActionButton){
    if (ActionButton == "btnEditProfile"){
        /*Active the button SaveChanges*/
        document.getElementById('btnSaveChanges').style.display='block';
        /*Desactive the button EditProfile*/
        document.getElementById('btnEditProfile').disabled=true;
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
        /*Desactive the text field Reply Password*/
        document.getElementById('actionReplyPassword').style.display='none';
        /*Active fields*/
        document.getElementById('txtName').disabled=true;
        document.getElementById('txtLastName').disabled=true;
        document.getElementById('txtPassword').disabled=true;
        document.getElementById('txtReplyPassword').disabled=true;
    }    

}

