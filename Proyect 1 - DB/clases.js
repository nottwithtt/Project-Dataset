/* Functions of Home */

function filterChange(filterUser){
    var filter = document.getElementById('navFilterDropdown');

    if(filterUser == "Users")
        filter.innerHTML = 'Users';
    if(filterUser == "Datasets")
        filter.innerHTML = 'Datasets';
    if(filterUser == "None")
        filter.innerHTML = 'Filter';
}
  
/* Functions of Profile */
function editProfile(ActionButton){
    if (ActionButton == "btnEditProfile"){
        document.getElementById('btnSaveChanges').style.display='block';
        document.getElementById('btnEditProfile').disabled=true;
    }    

}