const parameters = new URLSearchParams(window.location.search);
const idDataset = parameters.get('dataset');
const nameDataset = parameters.get('name');
sessionStorage.setItem
function getDataset(){
    const currentUrl = window.location.href;

    // Construct the download URL with the current URL in the query string
    const downloadUrl = `/dataset/${idDataset}?returnUrl=${encodeURIComponent(currentUrl)}`;
  
    // Redirect to the download URL
    window.location.href = downloadUrl;
}
