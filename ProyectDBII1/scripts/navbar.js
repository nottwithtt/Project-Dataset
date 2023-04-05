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