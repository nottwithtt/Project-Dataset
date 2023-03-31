

function createNewCard (){;
  const datasetCardDiv = ReactDOM.createRoot(document.getElementById("cardDiv"));
  let nombre = 'hola';

  const element = 
  <datasetBox
    datasetId = {nombre}
    href = "viewDataset.html"
    datasetImage = "public/Images/dataset_logo.png"
    datasetName = "Java dataset."
    datasetDescription = "Este es un trabajo spanglish de java."
    datasetIncludeDate = "16 de Julio de 2023"
    datasetFilesAmount = "3 Files"
    datasetSize = "25MB"
    datasetLikes = "10"
  />;

  datasetCardDiv.render(element);

}

