

function uploadPhoto (){
    
    const newImage = document.getElementById("imageDataSetForm").files[0];
    const imagePreview = document.getElementById("imageDataSet");
    const reader = new FileReader();

    reader.onloadend = function () {
        imagePreview.src = reader.result;
        console.log(reader.result);
    }
    reader.readAsDataURL(newImage);
}

function createDataSetTest (){
    let datasetName =  document.getElementById("txtNameDataset").value;
    let datasetDescription = document.getElementById("txtDescriptionDataset").value;
    let datasetImage = document.getElementById("imageDataSetForm").files[0];
    let datasetFiles = document.getElementById("fileDataset").files;
}