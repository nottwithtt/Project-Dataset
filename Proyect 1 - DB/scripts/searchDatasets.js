
function createNewCard (){;
  const datasetCardDiv = document.querySelector("#cardDiv");

  var datasetCardStructure = `
  <div id="dataSetCard1" class="col-3 list-group mt-5 mx-5">
    <a href="#" onclick="createNewCard()" class="container d-flex flex-column list-group-item list-group-item-action ">
      <div class="d-flex justify-content-center">
        <img id="datasetImage" class="card-img-top mx-auto" src="Images/Home/dataset_logo.png" Style="width: 55%">
      </div>
      <div>
        <p id="nameD1" class="card-title h6 mx-3">Dataset1</p>
        <p id="descriptionD1" class="card-text text-secondary mx-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, blanditiis.</p>
      </div>

      <hr class="mt-2">
      <div class="col-12 d-flex">
        <div class="col-8 d-flex flex-column justify-content-around">
          <div><p id="dateIncludeD1" class="text-secondary mx-3">Include 16th march 2023</p></div>
          <div><p id="countFilesD1" class="text-secondary mx-3">1 File</p></div>
        </div>

        <div class="col-3 d-flex flex-column justify-content-around">
          <div><p id="sizeD1" class="text-secondary mx-3">34mb</p></div>

          <div class="mx-3">
            <div class="card" style="height: 30px; width: 70px;">
            <div class=" col-12 d-flex flex-row ">
              <div class="col-6" >
                <p id="dataSetLikes" class="text-secondary mt-1 mx-2">4</p>
              </div>
              <div class="class=6">
                <img src="Images/Icons/like.png" style="width: 20px;">
              </div>
            </div>   
          </div>
        </div>
      </div>
        
    </div>
  </a>
  </div>
  `;
  

}