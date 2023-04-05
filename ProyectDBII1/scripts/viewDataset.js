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
             size = ((arrayData[i].length)/1000).toString()+ " MB";
        }else{
            size = (arrayData[i].length/10000).toString()+ " GB";
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
    const response = await fetch('/getDownloadedUsers',{
        method: "POST",
        body: JSON.stringify({data: idDataset}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let users = answer.users;
    console.log(users);
    let container = document.getElementById("downloadedUsers");
    container.innerHTML = ``;
    for(let i =0;i<users.length;i++){
        let divPrincipal = document.createElement('div');
        divPrincipal.classList.add("row", "d-flex", "flex-row", "justify-content-between");

        divPrincipal.innerHTML = `<h6>${users[i].username}</h6>
                                      <hr>`;
        container.appendChild(divPrincipal);
    }
    let counterNumber = users.length;
    let containerCounter = document.getElementById("counter");
    let textCounter = document.getElementById("counterText");
    textCounter.textContent = `${counterNumber}`;
    containerCounter.appendChild(textCounter);

}

getDownloadedUsers();


async function getLikedUsers(){
    const response = await fetch('/getLikesDataset',{
        method: "POST",
        body: JSON.stringify({data: idDataset}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let users = answer.result;
    let container = document.getElementById("counterLikes");
    let counterUsers = users.length;
    console.log(counterUsers)
    container.innerHTML = `<p>${counterUsers}</p>`
}

getLikedUsers();


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

    await getDownloadedUsers();

}

async function likeUser(){
    const response = await fetch('/getUserLikedDatasets',{
        method: "POST",
        body: JSON.stringify({user: userId}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let likes = answer.result;
    let flag = false;
    for(let i = 0;i<likes.length;i++){
        if(likes[i].id_mongo==idDataset){
            let responseDelete = await fetch('/deleteUserLike',{
                method: "POST",
                body: JSON.stringify({user: userId,
                dataset: idDataset}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            let answer = await responseDelete.json();
            flag =  answer.result;
            await getLikedUsers();
        }
    }
    if(!flag){
        let responseAdd =await fetch('/addUserLike',{
            method: "POST",
            body: JSON.stringify({user: userId,
            dataset: idDataset}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        let answer = await responseAdd.json();
        if(answer.result)
            await getLikedUsers();
   }
}
