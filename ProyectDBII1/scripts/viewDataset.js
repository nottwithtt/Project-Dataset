const parameters = new URLSearchParams(window.location.search);
const idDataset = parameters.get('dataset');
const nameDataset = parameters.get('name');
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
    newImage.style = "height: 8vw; width: 8vw; border-radius: 50%;"
    container.appendChild(newImage);
    

}

uploadPhoto();

async function getInfoDataset(){
    const response = await fetch('/getInfoDataset',{
        method: "POST",
        body: JSON.stringify({data: idDataset}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const datasetInfo = await response.json();
    console.log(datasetInfo);
    const container = document.getElementById("description");
    let child = document.createElement("p");
    child.classList.add("h6","mx-5","col-9");
    child.textContent = datasetInfo.description;
    container.appendChild(child);

    const containerName = document.getElementById("contenedorName");
    let childName = document.createElement("p");
    childName.classList.add("h4", "mx-5");
    childName.textContent= datasetInfo.name;
    containerName.appendChild(childName);

    const containerDate = document.getElementById("containerDate");
    let childDate = document.createElement("p");
    childDate.classList.add("text-secondary", "mx-5", "mt-5");
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

function getDataset(){
    const currentUrl = window.location.href;

    // Construct the download URL with the current URL in the query string
    const downloadUrl = `/dataset/${idDataset}?returnUrl=${encodeURIComponent(currentUrl)}`;
  
    // Redirect to the download URL
    window.location.href = downloadUrl;
}
