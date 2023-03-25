/* Functions of Sign In */

function signIn(){
    let username = document.getElementById('txtUsernameSignIn');
    let password = document.getElementById('txtPasswordSignIn');
    let authorizeCorrect = true;
    // Verify in the database Password and User

    if (authorizeCorrect){
        window.location.href ="Home.html";
        //Save userMongoId
    }
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

