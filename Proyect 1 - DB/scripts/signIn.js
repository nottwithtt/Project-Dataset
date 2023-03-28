
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