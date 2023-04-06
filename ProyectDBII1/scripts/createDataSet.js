const idUser = sessionStorage.getItem('id');

function uploadPhoto (){
    
    const newImage = document.getElementById("imageDataSetForm").files[0];
    const imagePreview = document.getElementById("imageDataSet");
 
    if (newImage) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          imagePreview.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(newImage);
    }
}

async function createDataSetTest (){
    let datasetName =  document.getElementById("txtNameDataset").value;
    let datasetDescription = document.getElementById("txtDescriptionDataset").value;
    let datasetImage = document.getElementById("imageDataSetForm").files[0];
    let datasetFiles = document.getElementById("fileDataset").files;
    if(datasetImage&&datasetFiles&&datasetDescription&&datasetName){
        let formDataOne = new FormData();
        formDataOne.append('photoDataset',datasetImage)
        const responseIdPhotoDataset = await fetch('/uploadPhotoDataset',{
            method: "POST",
            body: formDataOne
        });
        let response = await responseIdPhotoDataset.json()
        let idPhoto = response.answer;
        console.log(idPhoto);
        let formDataTwo = new FormData();
        for(let i = 0;i<datasetFiles.length;i++){
            formDataTwo.append('filesDataset',datasetFiles[i]);
        }
        const responseIdsFiles = await fetch('/uploadFilesDataset',{
            method: "POST",
            body: formDataTwo
        })
        let responseIdFiles = await responseIdsFiles.json();
        let arrayIds = responseIdFiles.answer;
        console.log(arrayIds);
        const uploadDataset = await fetch('/uploadDataset',{
            method: "POST",
            body: JSON.stringify({
                nameDataset: datasetName,
                description: datasetDescription,
                archivosDataset: arrayIds,
                photoDataset: idPhoto,
                user: idUser
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

    }e
}