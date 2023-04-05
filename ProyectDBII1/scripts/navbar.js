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

function Search(){
    const filter = document.getElementById('navFilterDropdown');
    console.log(filter.innerHTML);
    
    if(filter.innerHTML == "Users"){
        window.location.href= "/SearchUsers";
    }
    else if (filter.innerHTML == "Name Dataset" || filter.innerHTML == "Description Dataset"){
        window.location.href= "/SearchDatasets";
    }
}

function SignOut(){
    InactiveUser();
    window.location.href= "/"
}