// Functions of Navbar

/*Change the state of the button filter*/
function FilterChange(filterUser){
    const filter = document.getElementById('navFilterDropdown');

    if(filterUser == "Users")
        filter.innerHTML = 'Users';
    if(filterUser == "NameDataset")
        filter.innerHTML = 'Name Dataset';
    if(filterUser == "DescriptionDataset")
        filter.innerHTML = 'Description Dataset';
    if(filterUser == "None")
        filter.innerHTML = 'Filter';
}

async function loadPhotoUser(){
    const photoUser = document.getElementById("photoUser");

    const idPhoto = sessionStorage.getItem("photo");
    const response = await fetch('/getPhotoUser',{
        method: "POST",
        body: JSON.stringify({photo: idPhoto}),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const blob = await response.blob();
    console.log(blob);
    const url = URL.createObjectURL(blob);

    photoUser.src= url;
}

async function Search(){
    const filter = document.getElementById('navFilterDropdown');
    console.log(filter.innerHTML);
    const query = document.getElementById('txtSearchNavbar').value;
    if(filter.innerHTML == "Users"){
        const results = await fetch('/usersSearch',{
            method: "POST",
            body: JSON.stringify({query: query}),
            headers: {
                "Content-Type": "application/json",
            },

        })

        let answer = await results.json();
        let arrayResults = answer.result;
        window.location.href= `/SearchUsers?results=${encodeURIComponent(JSON.stringify(arrayResults))}`;
    }
    else if (filter.innerHTML == "Name Dataset"){
        const results = await fetch('/nameDatasetSearch',{
            method: "POST",
            body: JSON.stringify({query: query}),
            headers: {
                "Content-Type": "application/json",
            },

        })

        let answer = await results.json();
        let arrayResults = answer.result;
        window.location.href= `/SearchDatasets?results=${encodeURIComponent(JSON.stringify(arrayResults))}`;
    }else if(filter.innerHTML == "Description Dataset"){
        const results = await fetch('/descriptionDatasetSearch',{
            method: "POST",
            body: JSON.stringify({query: query}),
            headers: {
                "Content-Type": "application/json",
            },

        })

        let answer = await results.json();
        let arrayResults = answer.result;
        window.location.href= `/SearchDatasets?results=${encodeURIComponent(JSON.stringify(arrayResults))}`;
    }
}

function SignOut(){
    InactiveUser();
    window.location.href= "/"
}

async function loadNotifications(){

    let responseServer = await fetch('/getNotificationsUser',{
        method: "POST",
        body : JSON.stringify({userId: sessionStorage.getItem('id')}),
        headers: {
                 "Content-Type": "application/json",
        },
    })

    let answer = await responseServer.json();
    let arrayNotifications = answer.result;

    console.log(arrayNotifications);

    let usersNotification = [];

    for(let i =0;i<arrayNotifications.length;i++){
        let responseUser = await fetch('/getUser',{
            method: "POST",
            body : JSON.stringify({idUser: arrayNotifications[i].id_userSubmit}),
            headers: {
                 "Content-Type": "application/json",
            },
        })

        let answer = await responseUser.json();
        console.log(answer);
        console.log("AnswerUser");
        let user = answer.user[0];
        usersNotification.push(user);
    }

    let appendTo = document.getElementById('containerNotifications');
    for(let i = 0;i<arrayNotifications.length;i++){
        let dateObj = new Date(arrayNotifications[i].dateNotifies);
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth() + 1; // add 1 to get 1-based month
        let day = dateObj.getDate();
        let hour = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let amPm = "am";
        if(parseInt(hour)>12) amPm = "pm"
        let divPrincipal = document.createElement('div');
        divPrincipal.classList.add("row", "d-flex", "flex-row", "justify-content-between");
        divPrincipal.id = usersNotification[i]._id;
        divPrincipal.onclick =  function() {
            viewClickedProfileNotifications(arrayNotifications[i]._id,usersNotification[i]._id);
        }
        divPrincipal.innerHTML =
              `<div class="col-4">
                <h6>${day}-${month}-${year} ${hour}:${minutes}${amPm}</h6>
              </div>
              <div class="col-8" id="not-1">
                <h6>The user ${usersNotification[i].username} create a dataset about ${arrayNotifications[i].nameDataSet}</h6>
              </div>
            </div>

            <hr>`
        appendTo.appendChild(divPrincipal);
    }

    let notificationCounter = document.getElementById('counterNotifications');
    let numberNotifications = arrayNotifications.length;
    notificationCounter.textContent = `${numberNotifications}`;
}

loadNotifications();

async function viewClickedProfileNotifications(idNotification,element){
    let responseDeleteNotification = await fetch('/deleteNotification',{
        method: "POST",
        body : JSON.stringify({idNotification: idNotification}),
        headers: {
             "Content-Type": "application/json",
        },
    });
    let answer = await responseDeleteNotification.json();
    console.log(answer);
    window.location.href = `ViewUser?user=${element}`
}