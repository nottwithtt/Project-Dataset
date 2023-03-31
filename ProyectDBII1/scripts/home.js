
function filterChange(filterUser){
    let filter = document.getElementById('navFilterDropdown');

    if(filterUser == "Users")
        filter.innerHTML = 'Users';
    if(filterUser == "NameDataset")
        filter.innerHTML = 'Name Dataset';
    if(filterUser == "DescriptionDataset")
        filter.innerHTML = 'Description Dataset';
    if(filterUser == "None")
        filter.innerHTML = 'Filter';
}

function changeInfoUser(){
    let homeUser = document.getElementById('homeUsername');
    homeUser.innerText = sessionStorage.getItem("username");
}
