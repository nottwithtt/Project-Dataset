const parameters = new URLSearchParams(window.location.search);
const idDataset = parameters.get('dataset');
const nameDataset = parameters.get('name');
sessionStorage.setItem


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

    for(let i =0;i<arrayData.length;i++){
        
    }
}

getFiles();

function getDataset(){
    const currentUrl = window.location.href;

    // Construct the download URL with the current URL in the query string
    const downloadUrl = `/dataset/${idDataset}?returnUrl=${encodeURIComponent(currentUrl)}`;
  
    // Redirect to the download URL
    window.location.href = downloadUrl;
}
