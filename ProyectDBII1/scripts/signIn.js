// Functions of SignIn.html


/* Function that verifies what a user is authorized to do*/ 
function SignIn(){
    const username = document.getElementById('txtUsernameSignIn');
    const password = document.getElementById('txtPasswordSignIn');
    const authorizeCorrect = true;
    
     // PENDIENTE
    // Verify in the database Password and User
    /*
    try {
        const idUser = authorizeAccess(username,password);
    } catch (e) {
        authorizeCorrect = false;
        messageErrorInHTML
    }
    */
    if (authorizeCorrect){
         // PENDIENTE
        /*
        const name = "";
        const lastName = "";
        const birthday = "";
        const photo = "";
        */

        exampleSession();
         // PENDIENTE
        /*updateActiveUser(name,lastName,username,birthday,photo);*/
        window.location.href ="/Home";
        
    }
    
}

/* Function that consult in the dabase if a user is authorized to do*/ 
function authorizeAccess(){
    // PENDIENTE
}