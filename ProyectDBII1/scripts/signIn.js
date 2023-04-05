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

    if (authorizeCorrect===true){

        updateActiveUser(user._id,user.firstName,user.firstSurname,user.username,user.birthDate,user.photo)

        window.location.href ="/Home";
        
    }
    
}