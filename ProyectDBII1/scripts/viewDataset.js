const parameters = new URLSearchParams(window.location.search);
const idDataset = parameters.get('dataset');
const nameDataset = parameters.get('name');
const userId = sessionStorage.getItem('id');
sessionStorage.setItem
const buttons = [];

async function uploadPhoto (){
    const response = await fetch('/getPhotoDataset',{
        method: "POST",
        body: JSON.stringify({data: idDataset}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const blob = await response.blob();
    console.log(blob);
    const url = URL.createObjectURL(blob);

    const newImage = document.createElement('img');
    const container = document.getElementById("contenedorFoto");
    newImage.id = "imageDataset";
    newImage.src = url;
    newImage.style = "height: 12vw; width: 12vw; border-radius: 5%;"
    container.appendChild(newImage);
}


async function getInfoDataset(){
    const response = await fetch('/getInfoDataset',{
        method: "POST",
        body: JSON.stringify({data: idDataset}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    uploadPhoto();

    const datasetInfo = await response.json();
    console.log(datasetInfo);
    const container = document.getElementById("description");
    let child = document.createElement("p");
    child.classList.add("h6");
    child.style= "margin-left: 3vw";
    child.textContent = datasetInfo.description;
    container.appendChild(child);

    const containerName = document.getElementById("contenedorName");
    let childName = document.createElement("p");
    childName.classList.add("h4");
    childName.style= "margin-left: 3vw";
    childName.textContent= datasetInfo.name;
    containerName.appendChild(childName);

    const containerDate = document.getElementById("containerDate");
    let childDate = document.createElement("p");
    childDate.classList.add("text-secondary", "mt-1");
    childDate.style= "margin-left: 3vw";
    childDate.textContent = datasetInfo.dateOfInsert;
    containerDate.appendChild(childDate);


}

getInfoDataset();

async function getFiles(){
    const filesDataset = await fetch('/getFilesDataset',{
    method: "POST",
    body : JSON.stringify({dataId:idDataset}),
    headers: {
               "Content-Type": "application/json",
             },
    });

    const response = await filesDataset.json();
    const arrayData = response.dataFiles;
    let appendTo = document.getElementById("divContenedor");
    let size;
    for(let i =0;i<arrayData.length;i++){
        if(arrayData[i].length<1000){
            size = arrayData[i].length.toString()+" B";
        }else if(1000<=arrayData[i].length<=1000000){
             size = arrayData[i].length.toString()+ " MB";
        }else{
            size = arrayData[i].length.toString()+ " GB";
        }
        let child = document.createElement("input");
        child.type = 'checkbox';
        child.classList.add('mb-0', 'btn-check');
        child.id = `${arrayData[i]._id}`;
        child.autocomplete = 'off';

        let label = document.createElement('label');
        label.classList.add('btn', 'btn-outline-primary');
        label.id = arrayData[i]._id;
        label.htmlFor = `${arrayData[i]._id}`;
        label.textContent = `${arrayData[i].filename} ${size}`;
        appendTo.appendChild(child);
        appendTo.appendChild(label);

        buttons.push(`${arrayData[i]._id}`);
    }
}

getFiles();

console.log(buttons);

async function validaCheckBox(){
    let files = [];
    for(let i =0;i<buttons.length;i++){
        checkBox = document.getElementById(buttons[i]);
        if (checkBox.checked){
            files.push(buttons[i]);
        }
    }
    const response = await fetch("/getSomeFiles",{
        method: "POST",
        body: JSON.stringify({data: files}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'archivos.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}

async function getDownloadedUsers(){
    const response = await fetch('/getLikedUsers',{
        method: "POST",
        body: JSON.stringify({data: idDataset}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let users = answer.users;
    console.log(users);
    let container = document.getElementById("likedUsers");
    for(let i =0;i<users.length;i++){
        let divPrincipal = document.createElement('div');
        divPrincipal.classList.add("row", "d-flex", "flex-row", "justify-content-between");

        divPrincipal.innerHTML = `<h6>${users[i].username}</h6>
                                      <hr>`;
        container.appendChild(divPrincipal);
    }
    let counterNumber = users.length;
    let containerCounter = document.getElementById("counter");
    let textCounter = document.createElement('p');
    textCounter.textContent = `${counterNumber}`;
    containerCounter.appendChild(textCounter);

}

getDownloadedUsers();

async function getDataset(){
    const currentUrl = window.location.href;

    // Construct the download URL with the current URL in the query string
    const downloadUrl = `/dataset/${idDataset}?returnUrl=${encodeURIComponent(currentUrl)}`;
    
    window.location.href = downloadUrl;

    const response = await fetch('/addUserDownload',{
        method: "POST",
        body: JSON.stringify({data:idDataset,
                              user:userId}),
        headers: {
                "Content-Type": "application/json",
        },
    })

}

// Comments Functions

async function newCommentBox (idComment, commentContent) {
    let container = document.getElementById("commentsContainer");

    let divPrincipal = document.createElement('div');
    divPrincipal.style = "width: auto; height: auto;";
    divPrincipal.id = idComment;
    divPrincipal.innerHTML =
    `<div class="card d-flex flex-row mt-3" style="width: auto; height: auto;">
        <div class="mx-2 mb-1 mt-1">
            <img src="Images/Icons/noImage.jpg" style="height: 2vw; width: 2vw; border-radius: 50%;">
        </div>
        <div class="mx-4" style="margin-top: 0.6vw;font-size: small;"> <p>${commentContent}</p></div>
    </div>
    <a class="text-secondary mx-1" style="font-size: small">Reply</a>`;

    container.appendChild(divPrincipal);

    console.log(divPrincipal.id);


}

async function createNewComment() {
    getComments();
    let p_idUser = sessionStorage.getItem("id");
    let p_idComment = 1;
    let p_idCommentResponse = null;
    let p_creationDate = '2023-04-05';
    let p_content = document.getElementById("txtMessageComment").value;
    let p_file = null;
    console.log(p_creationDate);

    const response = await fetch('/createComment',{
        method: "POST",
        body: JSON.stringify({idUser: p_idUser,
                            idComment: p_idComment,
                            idCommentResponse: p_idCommentResponse,
                            idDataset: idDataset,
                            creationDate: p_creationDate,
                            content: p_content,
                            file: p_file}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const answer = await response.json();
    newCommentBox(answer.idComment, answer.content);
    getComments();

    
}

async function getComments() {

    const response = await fetch('/getDatasetComments',{
        method: "POST",
        body: JSON.stringify({datasetId: idDataset}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    
    let answer = await response.json();

    for (let i = 0; i < answer.length; i++){
        console.log(answer[i].idComment, answer[i].content);
    }
}

