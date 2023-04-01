
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


