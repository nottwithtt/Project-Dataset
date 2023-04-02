let user = "6425467f5d0f34d2eebd03cc";
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
    for(let i =0;i<datasets.length;i++){
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
            <p id="descriptionD1" class="card-text text-secondary mx-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, blanditiis.</p>
          </div>
          <div class="col-1 ">
            <img src="Images/Icons/noImage.jpg" style="width: 4vw; height: 4vw; border-radius: 50%; ">
          </div>
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
                    <div class="col-6">
                      <p class="text-secondary mt-1 mx-2">4</p>
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


