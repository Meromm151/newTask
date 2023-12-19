var BookmarkName = document.getElementById("BookmarkName");
var BookmarkUrl = document.getElementById("BookmarkUrl");
var submitBtn = document.getElementById("submitBtn");
var tbody= document.getElementsByTagName("tbody");
var alertbtn=document.getElementById("alertbtn");
var alert= document.querySelector("#alert");
var books = [];

localStorageCheck();

function localStorageCheck(){
  if(localStorage.getItem("books") !=null){
    books=JSON.parse(localStorage.getItem("books"))
    display();
  }
}

submitBtn.addEventListener("click",()=>{
  if(BookmarkNameValidation() && BookmarkUrlValidtaion()){
    addBook();
    emptyInput();
    display();
  }else{
    alert.classList.remove("d-none");
    if(!BookmarkNameValidation() && !BookmarkUrlValidtaion()){
      document.querySelector("p:nth-child(2)").classList.remove("d-none")
      document.querySelector("p:nth-child(3)").classList.remove("d-none")
    }
    else if(!BookmarkNameValidation()){
      document.querySelector("p:nth-child(2)").classList.remove("d-none");
      document.querySelector("p:nth-child(3)").classList.add("d-none");
    }
    else{
      document.querySelector("p:nth-child(2)").classList.add("d-none")
      document.querySelector("p:nth-child(3)").classList.remove("d-none")
    }
  }
});

alertbtn.addEventListener("click",()=>{
  document.querySelector("p:nth-child(2)").classList.add("d-none")
  document.querySelector("p:nth-child(3)").classList.add("d-none")
  alert.classList.add("d-none");
})

BookmarkName.addEventListener("input",()=>{
  BookmarkNameValidation();
})

BookmarkUrl.addEventListener("input", ()=>{
  BookmarkUrlValidtaion();
})

function BookmarkNameValidation(){
  var namePattern=/^[a-zA-Z ]{3,15}$/;
  if(namePattern.test(BookmarkName.value)){
    BookmarkName.classList.add("is-valid");
    BookmarkName.classList.remove("is-invalid");
    return true;
  }
  else{
    BookmarkName.classList.add("is-invalid");
    BookmarkName.classList.remove("is-valid");
    console.log("false")
    return false;
}
}

function BookmarkUrlValidtaion(){
  var namePattern=/^((http:[\/]{2}www[\.]|https:[\/]{2}www[\.])|www[\.])?[a-zA-Z0-9@:%._\\+~#?&\/=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%._\\+~#?&\/=]*)?$/;
  if(namePattern.test(BookmarkUrl.value)){
    BookmarkUrl.classList.add("is-valid");
    BookmarkUrl.classList.remove("is-invalid");
    return true;
  }
  else{
    BookmarkUrl.classList.add("is-invalid");
    BookmarkUrl.classList.remove("is-valid");
    return false;
}}

function addBook() {
  book = {
    name: BookmarkName.value,
    url: BookmarkUrl.value,
  };
  books.push(book);
  localStorage.setItem("books" , JSON.stringify(books));
}

function emptyInput() {
  BookmarkName.value = "";
  BookmarkUrl.value = "";
  if(BookmarkName.value == "" && BookmarkUrl.value == ""){
    BookmarkName.classList.remove("is-valid");
    BookmarkUrl.classList.remove("is-valid");
  }
}

function display() {
  var container="";
  for (var i = 0; i < books.length; i++) {
    container+=
    `
    <tr>
    <td>${i}</td>
    <td>${ books[i].name}</td>
    <td><a href="${books[i].url}" target="_blank" class="text-decoration-none btn btn-info text-white"><i class="fa-solid fa-eye"></i> Visit</a></td>
    <td><button class="btn btn-danger" onclick="remove(${i})"><i class="fa-solid fa-trash-can"></i> Remove</button></td>
    </tr>
    `;
  }
  tbody[0].innerHTML=container;
}

function remove(index){
  books.splice(index , 1 );
  localStorage.setItem("books" , JSON.stringify(books));
  display();
}

function closePopUp(){
  document.getElementsByClassName("popup")[0].classList.add("d-none");
}