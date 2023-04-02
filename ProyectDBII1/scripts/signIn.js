// Functions of SignIn.html


/* Function that verifies what a user is authorized to do*/ 
async function SignIn(){
    const username = document.getElementById('txtUsernameSignIn').value;
    const password = document.getElementById('txtPasswordSignIn').value;
    
    const response = await fetch('/encryptPassword',{
        method: "POST",
        body: JSON.stringify({userName: username,
        Password: password}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    let responseObject = await response.json();
    let authorizeCorrect = responseObject.answer.isUser;
    let user = responseObject.answer.user;

    console.log(authorizeCorrect)

    if (authorizeCorrect===true){
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