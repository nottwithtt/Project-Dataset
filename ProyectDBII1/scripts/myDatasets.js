let user = sessionStorage.getItem("id");
let container = document.getElementById('datasetContenedor');

async function getDatasets(){
    const response = await fetch("/datasets",{
        method: "POST",
        body: JSON.stringify({data: user}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    let responseJason = await response.json();
    let datasets = responseJason.response;
    let appendTo = document.getElementById("datasetContenedor");
    console.log(datasets);

    for(let i =0;i<datasets.length;i++){
      console.log(datasets[i].id_mongo);
      const response = await fetch('/getPhotoDataset',{
        method: "POST",
        body: JSON.stringify({data: datasets[i].id_mongo}),
        headers: {
            "Content-Type": "application/json",
        },
      })

     //Trae un array con la lista de usuarios que han dado like
      const likes = await fetch('/getLikesDataset',{
        method: "POST",
        body: JSON.stringify({data: datasets[i].id_mongo}),
        headers: {
            "Content-Type": "application/json",
        },
      })

      let answerLikes = await likes.json();
      let counter = answerLikes.result.length;

      
      const filesDataset = await fetch('/getFilesDataset',{
          method: "POST",
          body : JSON.stringify({dataId: datasets[i].id_mongo}),
          headers: {
                     "Content-Type": "application/json",
                   },
      });

      let size = 0;

      const files = await filesDataset.json();
      const arrayData = files.dataFiles;
      for (let i =0;i<arrayData.length;i++){
        size+= arrayData[i].length;
      }

      if(size<1000){
        size = size.toString()+" B";
      }else if(1000<=size<=1000000){
         size = (size/1000).toString()+ " MB";
      }else{
        size = (size/10000).toString()+ " GB";
      }

      //Convierte la foto del dataset en blob.
      const blob = await response.blob();
      console.log(blob);
      const url = URL.createObjectURL(blob);

      const responseInfo = await fetch('getInfoDataset',{
        method:"POST",
        body: JSON.stringify({data: datasets[i].id_mongo}),
        headers: {
          "Content-Type": "application/json",
        },
      })

      let answerInfo = await responseInfo.json();
      
      let dateObj = new Date(answerInfo.dateOfInsert);
      let formattedDate = dateObj.toISOString().substring(0, 10);

      let contador = arrayData.length;
      let divPrincipal = document.createElement('div');
      divPrincipal.classList.add('col-3','list-group','mt-5','mx-5');
      divPrincipal.id = datasets[i].id_mongo;
      divPrincipal.innerHTML =
        `<a href="ViewDataset?dataset=${datasets[i].id_mongo}&name=${datasets[i].name}" class="container d-flex flex-column list-group-item list-group-item-action ">
        <div class="d-flex justify-content-center">
          <img class="card-img-top mx-auto" src="Images/Home/dataset_logo.png" Style="width: 55%">
        </div>
        <div class="col-12 d-flex flex-row">
          <div class="col-10 d-flex flex-column">
            <p id="nameD1" class="card-title h6 mx-3">${datasets[i].name}</p>
            <p id="descriptionD1" class="card-text text-secondary mx-3">${answerInfo.description}</p>
          </div>
          <div class="col-1 ">
            <img src=${url} style="width: 4vw; height: 4vw; border-radius: 50%; ">
          </div>
        </div>
        
        <hr class="mt-2">
        <div class="col-12 d-flex">
          <div class="col-8 d-flex flex-column justify-content-around">
            <div><p id="dateIncludeD1" class="text-secondary mx-3">${formattedDate}</p></div>
            <div><p id="countFilesD1" class="text-secondary mx-3">${contador} files</p></div>
          </div>
        
          <div class="col-3 d-flex flex-column justify-content-around">
            <div><p id="sizeD1" class="text-secondary mx-3">${size}</p></div>
        
            <div class="mx-3">
                <div class="card" style="height: 30px; width: 70px;">
                  <div class=" col-12 d-flex flex-row ">
                    <div class="col-6">
                      <p class="text-secondary mt-1 mx-2">${counter}</p>
                    </div>
                    <div class="class=6">
                      <img src="Images/Icons/like.png" style="width: 20px;">
                    </div>
                  </div>
                  
                </div>
            </div>
          </div>
          
        </div>
        </a>`
        appendTo.appendChild(divPrincipal);
    }
}

getDatasets();


