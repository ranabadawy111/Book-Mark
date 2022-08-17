let nameInput= document.getElementById("name");
let uRLInput= document.getElementById("URL");
let addBtn= document.getElementById("addBtn");
let tableBody= document.getElementById("tableBody");
let bookMarks;
let updateBtn= document.getElementById("updateBtn");
let mainIndex=0;
let searchInput= document.getElementById("searchInput");
let alerts= document.querySelectorAll(".alert");

if(localStorage.getItem("bookMarks")!=null){
    bookMarks= JSON.parse(localStorage.getItem("bookMarks"));
    displayBookMark(bookMarks);
    hideAlerts();
}else{
    hideAlerts();
    bookMarks=[];
}

addBtn.onclick= function(){
    if(checkName(nameInput.value)==true && checkUrl(uRLInput.value)==true){
        let bookMark= {
            name: nameInput.value,
            url: uRLInput.value 
        }
        bookMarks.push(bookMark);
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
        displayBookMark(bookMarks);
        clearBookMark();
       hideAlerts();
    }else{
        if(checkName(nameInput.value)==false){
            showNameError("this name already exist");
        }if(checkUrl(uRLInput.value)==false){
            showUrlError("this url already exist");
        }if(nameInput.value==null || nameInput.value== ""){
            showNameError("Name is required");
        }if(uRLInput.value==null || uRLInput.value== ""){
            showUrlError("Url Field is required");
        }
    }
    
}

function checkName(name) {
    if (name == null || name == "") {
        return false;
    }
    for (let i = 0; i < bookMarks.length; i++) {
        if (bookMarks[i].name === name)
            return false;
    }
    return true;
}

function checkUrl(url) {
    if (url == null || url == "") {
        return false;
    }
    for (let i = 0; i < bookMarks.length; i++) {
        if (bookMarks[i].url === url)
            return false;
    }
    return true;
}

function hideAlerts(){
    for(i=0;  i<alerts.length; i++){
        alerts[i].style.display= 'none';
    }
}
function showNameError(msg) {
    let nameError = document.getElementById('emptyName');
    nameError.innerHTML = msg;
    nameError.style.display = 'block';
}

function showUrlError(msg) {
    let urlError = document.getElementById('emptyUrl');
    urlError.innerHTML = msg;
    urlError.style.display = 'block';
}

function isNameValid(){
    let nameRegex= /^[A-Za-z]{1,}$/;
    if(nameRegex.test(nameInput.value)==true){
        nameInput.classList.replace("is-invalid","is-valid");
        return true;
    }else{
        nameInput.classList.add("is-invalid");
        return false;
    }
}
function isUrlValid(){
    let urlRegex= /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
    if(urlRegex.test(uRLInput.value)==true){
        uRLInput.classList.replace("is-invalid","is-valid");
        return true;
    }else{
        uRLInput.classList.add("is-invalid");
        return false;
    }
}
nameInput.onkeyup= function(){
    if(isNameValid()==true){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.add= "true"
    }
}
uRLInput.onkeyup= function(){
    if(isUrlValid()==true){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.add= "true"
    }
}

function displayBookMark(bookMarkList){
    let mark=``;
    for(i=0;  i<bookMarkList.length;  i++){
        mark+=`
        <tr style="height:120px; background-image: linear-gradient(#EEE,#FFF);">
            <td>${bookMarkList[i].name}</td>
            <td>${bookMarkList[i].url}</td>
            <td><a href="${bookMarkList[i].url}"><button class="btn btn-primary">Visit</button></a></td>
            <td><button id="updateBtn" onclick="setValueForBookMark(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteBookMark(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML= mark;
}

function clearBookMark(){
    nameInput.value= "";
    uRLInput.value= ""
}

function deleteBookMark(deletedIndex){
    bookMarks.splice(deletedIndex, 1);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    displayBookMark(bookMarks);
}
function setValueForBookMark(updatedIndex){
    nameInput.value= bookMarks[updatedIndex].name;
    uRLInput.value= bookMarks[updatedIndex].url;
    updateBtn.classList.replace("d-none", "d-inline-block");
    addBtn.classList.add("d-none");
    mainIndex= updatedIndex;
}
function updateBookMark(){
    bookMarks[mainIndex].name= nameInput.value;
    bookMarks[mainIndex].url= uRLInput.value;
    updateBtn.classList.replace("d-inline-block","d-none");
    addBtn.classList.remove("d-none");
    displayBookMark(bookMarks);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    clearBookMark();
}

function searchBookMark(searchTerm){
    if(searchTerm.length>1){
        let search= [];
        for(i=0;  i<bookMarks.length;  i++){
            if(bookMarks[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true){
                search.push(bookMarks[i]);
                displayBookMark(search);
            }
        }
    }
}

