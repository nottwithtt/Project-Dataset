let user = sessionStorage.getItem("id");
let container = document.getElementById('userContenedor');
const parameters = new URLSearchParams(window.location.search);
const objectResults = parameters.get("results");
const searchResults = JSON.parse(decodeURIComponent(objectResults));

async function getDatasets(){
  let appendTo = document.getElementById("cardDiv");
  for(let i =0;i<searchResults.length;i++){
      //fetch que trae la foto del dataset
      const response = await fetch('/getPhotoDataset',{
        method: "POST",
        body: JSON.stringify({data: searchResults[i]._id}),
        headers: {
            "Content-Type": "application/json",
        },
     })

     //Trae un array con la lista de usuarios que han dado like
      const likes = await fetch('/getLikesDataset',{
        method: "POST",
        body: JSON.stringify({data: searchResults[i]._id}),
        headers: {
            "Content-Type": "application/json",
        },
      })

      let answerLikes = await likes.json();
      let counter = answerLikes.result.length;


      //Convierte la foto del dataset en blob.
      const blob = await response.blob();
      console.log(blob);
      const url = URL.createObjectURL(blob);
      
      let dateObj = new Date(searchResults[i].DateOfInsert);
      let formattedDate = dateObj.toISOString().substring(0, 10);

      let contador = searchResults[i].archivosDataset.length;

      let divPrincipal = document.createElement('div');
      divPrincipal.classList.add("col-3", "list-group", "mt-5", "mx-5");
      divPrincipal.id = searchResults[i]._id;
      divPrincipal.innerHTML =
      `<a href="ViewDataset?dataset=${searchResults[i]._id}" class="container d-flex flex-column list-group-item list-group-item-action ">
                <div class="d-flex justify-content-center">
                  <img id="datasetImage" class="card-img-top mx-auto" src=${url} Style="width: 55%">
                </div>
                <div>
                  <p id="nameD1" class="card-title h6 mx-3">${searchResults[i].name}</p>
                  <p id="descriptionD1" class="card-text text-secondary mx-3">${searchResults[i].description}</p>
                </div>

                <hr class="mt-2">
                <div class="col-12 d-flex">
                  <div class="col-8 d-flex flex-column justify-content-around">
                    <div><p id="dateIncludeD1" class="text-secondary mx-3">${formattedDate}</p></div>
                    <div><p id="countFilesD1" class="text-secondary mx-3">${contador}</p></div>
                  </div>

                  <div class="col-3 d-flex flex-column justify-content-around">
                    <div><p id="sizeD1" class="text-secondary mx-3">34mb</p></div>

                    <div class="mx-3">
                        <div class="card" style="height: 30px; width: 70px;">
                          <div class=" col-12 d-flex flex-row ">
                            <div class="col-6" >
                              <p id="dataSetLikes" class="text-secondary mt-1 mx-2">${counter}</p>
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
