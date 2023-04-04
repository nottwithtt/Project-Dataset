
function loadConversations () {
    /* functions to get all Conversations */
    /* for cicle to get the conversations one by one */
    createNewConversationBox(); // (inside the for) create a box for each conversation
}

function createNewConversationBox() {
    const modal = document.getElementById("conversationModal");
    const boxesDiv = document.querySelector("#conversationBoxesDiv");
    const convBox = document.querySelector("#conversationBox");
    const newConvBox = convBox.cloneNode(true);

    const usernameText = newConvBox.querySelector("p");
    //const imageBox = newConvBox.querySelector("img");

    usernameText.textContent= "New User";
    bootstrap.Modal.getInstance(modal).hide();
    //imageBox.src = newImage;

    boxesDiv.appendChild(newConvBox);
}
