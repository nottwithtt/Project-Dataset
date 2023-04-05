let user = sessionStorage.getItem("id");
let container = document.getElementById('userContenedor');
const parameters = new URLSearchParams(window.location.search);
const objectResults = parameters.get("results");
const searchResults = JSON.parse(decodeURIComponent(objectResults));

async function getUsers(){
    console.log(searchResults);
    let appendTo = document.getElementById("userContenedor");
    for(let i =0;i<searchResults.length;i++){
        //fetch que trae la foto del usuario
        const response = await fetch('/getPhotoUser',{
            method: "POST",
            body: JSON.stringify({photo: searchResults[i].photo}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        //Convierte en blob la foto del usuario
        let blob = await response.blob();
        console.log(blob);
        let url = URL.createObjectURL(blob);

        let dateObj = new Date(searchResults[i].birthDate);
        let formattedDate = dateObj.toISOString().substring(0, 10);

        let divPrincipal = document.createElement('div');
        divPrincipal.classList.add("col-3", "list-group", "mt-3", "mx-5");
        divPrincipal.id = searchResults[i]._id;
        divPrincipal.innerHTML =
        `<a href="viewUser?user=${searchResults[i]._id}" class="col-11 container d-flex flex-row list-group-item list-group-item-action " style="height: 40vm;">
        <div class="d-flex flex-column col-6">
          <div class="mt-3">
            <h6>${searchResults[i].firstName}</h6>
            <display-6 class="text-secondary">Luisa</h6>
          </div>

          <div class="mt-3">
            <h6>${searchResults[i].firstSurname}</h6>
            <display-6 class="">Vargas Monge</display-6>
          </div>

          <div class="mt-3">
            <h6>${searchResults[i].username}</h6>
            <display-6 class="">lu123vargas</display-6>
          </div>

          <div class="mt-3">
            <h6>Date of birth</h6>
            <display-6 class="">${formattedDate}</display-6>
          </div>

         
        </div>

        <div class="d-flex col-5">
          <div>
            <img src=${url} style="height: 10vw; width: 10vw; border-radius: 50%;">
          </div>
        </div>
    </a>`
        appendTo.appendChild(divPrincipal);
    }
}

getUsers();