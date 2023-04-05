const parameters = new URLSearchParams(window.location.search);
const idUser = parameters.get('user');
const idUserLogged = sessionStorage.getItem('id');


function checkLoggedUser(){
    if(sessionStorage.getItem('id')==idUser) window.location.href = '/myProfile'
}

checkLoggedUser();

async function checkFollowingUser(){

    const response = await fetch('/getFollowedUsers',{
        method: "POST",
        body: JSON.stringify({user: idUserLogged}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let users = answer.users;
    let flag = false;
    for(let i =0;i<users.length;i++){
        if(users[i].id_mongo==idUser) flag = true;
    }
    let buttonFollow = document.getElementById('btnEditProfile');
    buttonFollow.value = "";
    if(flag){
        buttonFollow.value = "Following"
    }else{
        buttonFollow.value = "Follow"
    }
}

checkFollowingUser();

async function follow(){
    let buttonFollow = document.getElementById('btnEditProfile');
    if(buttonFollow.value == "Following"){
        let response = await fetch('/deleteUserFollow',{
            method: "POST",
            body: JSON.stringify({follows: idUserLogged,
            followed: idUser}),
            headers: {
                "Content-Type": "application/json",
            },
        })

        let answer = await response.json();
        console.log(answer.result);
        await checkFollowingUser()
        await getFollowedUsers();
    }else{
        let response = await fetch('/addUserFollow',{
            method: "POST",
            body: JSON.stringify({follows: idUserLogged,
            followed: idUser}),
            headers: {
                "Content-Type": "application/json",
            },
        })

        let answer = await response.json();
        console.log(answer.result);
        await checkFollowingUser()
        await getFollowedUsers();
    }
}
async function uploadPhoto (){
    const userResponse = await fetch('/getUser',{
        method: "POST",
        body: JSON.stringify({idUser: idUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    let answerUser = await userResponse.json();
    let user = answerUser.user[0];


    const response = await fetch('/getPhotoUser',{
        method: "POST",
        body: JSON.stringify({photo: user.photo}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const blob = await response.blob();
    console.log(blob);
    const url = URL.createObjectURL(blob);

    const newImage = document.createElement('img');
    const container = document.getElementById("containerPhoto");
    newImage.id = "profilePhoto";
    newImage.src = url;
    newImage.style = "height: 8vw; width: 8vw; border-radius: 50%;"
    container.appendChild(newImage);

}

uploadPhoto();

async function getFollowingUsers(){
    const userResponse = await fetch('/getUser',{
        method: "POST",
        body: JSON.stringify({idUser: idUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    let answerUser = await userResponse.json();
    let user = answerUser.user[0];

    const response = await fetch('/getFollowedUsers',{
        method: "POST",
        body: JSON.stringify({user: user._id}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let users = answer.users;
    console.log(users);
    let container = document.getElementById("followedUsers");
    for(let i =0;i<users.length;i++){
        let divPrincipal = document.createElement('div');
        divPrincipal.classList.add("row", "d-flex", "flex-row" ,"justify-content-between");
        divPrincipal.id = users[i].id_mongo;
        divPrincipal.innerHTML = `<h6>${users[i].username}</h6>
                                      <hr>`;
        divPrincipal.onclick = divPrincipal.onclick =  function() {
            viewClickedProfile(users[i].id_mongo);
        }
        container.appendChild(divPrincipal);
    }
    let counterNumber = users.length;
    let containerCounter = document.getElementById("containerCounter");
    let textCounter = document.createElement('p');
    textCounter.textContent = `${counterNumber}`;
    textCounter.style = "font-size:larger;";
    containerCounter.appendChild(textCounter);

}

getFollowingUsers();



async function getFollowedUsers(){
    const userResponse = await fetch('/getUser',{
        method: "POST",
        body: JSON.stringify({idUser: idUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    let answerUser = await userResponse.json();
    let user = answerUser.user[0];
    const response = await fetch('/getFollowingUsers',{
        method: "POST",
        body: JSON.stringify({user: user._id}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const answer = await response.json();
    let users = answer.users;
    console.log(users);
    let container = document.getElementById("followingUsers");
    container.innerHTML = '';
    for(let i =0;i<users.length;i++){
        let divPrincipal = document.createElement('div');
        divPrincipal.classList.add("row", "d-flex", "flex-row" ,"justify-content-between");
        divPrincipal.id = users[i].id_mongo;
        divPrincipal.innerHTML = `<h6>${users[i].username}</h6>
                                      <hr>`;
        divPrincipal.onclick =  function() {
            viewClickedProfile(users[i].id_mongo);
        }
        container.appendChild(divPrincipal);
    }
    let counterNumber = users.length;
    let containerCounter = document.getElementById("containerFollowers");
    containerCounter.innerHTML = '';
    let textCounter = document.createElement('p');
    textCounter.textContent = `${counterNumber}`;
    textCounter.style = "font-size:larger;";
    containerCounter.appendChild(textCounter);

}

getFollowedUsers();

function viewClickedProfile(element){
    window.location.href = `ViewUser?user=${element}`
}

async function loadInfoUser(){
    const userResponse = await fetch('/getUser',{
        method: "POST",
        body: JSON.stringify({idUser: idUser}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    //Se trae el usuario respectivo
    let answerUser = await userResponse.json();
    let user = answerUser.user[0];

    //Le pasa el username
    let containerUsername = document.getElementById('divUsername');
    let textEl = document.createElement('p');
    textEl.classList.add("h2","mx-5");
    textEl.textContent = user.username;
    containerUsername.appendChild(textEl);
    //Le pasa el primer nombre
    let containerName = document.getElementById('divName');
    let textName = document.createElement('p');
    textName.style = "font-size:large;";
    textName.textContent = user.firstName;
    containerName.appendChild(textName);
    //Le pasa los apellidos
    let containerLastName = document.getElementById('divLastname');
    let txtLastname = document.createElement('p');
    txtLastname.style = "font-size:large";
    txtLastname.textContent = user.firstSurname;
    containerLastName.appendChild(txtLastname);

    //Formatea la fecha
    const dateObj = new Date(user.birthDate);
    const formattedDate = dateObj.toISOString().substring(0, 10);

    //le pasa la fecha

    let containerBirthday = document.getElementById("divBirth");
    let txtBirth = document.createElement('p');
    txtBirth.style = "font-size:large";
    txtBirth.textContent = formattedDate;
    containerBirthday.appendChild(txtBirth);

}

loadInfoUser();



async function getDatasets(){
    const response = await fetch("/datasets",{
        method: "POST",
        body: JSON.stringify({data: idUser}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    let responseJason = await response.json();
    let datasets = responseJason.response;
    let appendTo = document.getElementById("datasetContenedor");
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
            <div><p id="countFilesD1" class="text-secondary mx-3">${contador}</p></div>
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
