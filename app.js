const addBook = document.querySelector('.add');
const formCont = document.querySelector('.form-container');
const bookCont = document.querySelector('.book-container');
const form = document.querySelector('form');
const inputs = form.querySelectorAll('.inputs');
const search = document.getElementById('search-box');
const closeBtn = document.querySelector('.close');
let myLibrary = []
const date = document.querySelector('footer span');

addBook.onclick = () => formCont.classList.add('show');
closeBtn.onclick = () => removeForm();

// takes care of populating the app
form.addEventListener('submit', function(e){
    e.preventDefault();
    removeForm();
    addBookToLibrary(getInputs());
    displayBooks(myLibrary);
    e.target.reset();
});

// filter books
search.addEventListener('input', function(e){
    filBooks = myLibrary.filter(element => {
        let item = (element.title).toLowerCase();
        return item.includes((search.value).toLowerCase());
    });
    displayBooks(filBooks)
})

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = "unread"
    this.hasRead = () => {
        this.read = "read"
    }
    this.delete = () => {
        myLibrary = myLibrary.filter(book => {
            if(book !== this){
                return book
            }
        })
        displayBooks(myLibrary);
    }
}

function addBookToLibrary(item){
    const book = new Book(item.title, item.author, item.pages)
    if(item.view.checked){
      book.hasRead()
    }
    myLibrary.push(book);
}

function getInputs(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const view = document.querySelector(".check");

    return {title, author, pages, view};
}

function displayBooks(displayItem){
    let bookItems = displayItem.map(function(item){
        return `<div class="books">
        <p class="title">${item.title}</p>
        <p class="author">${item.author}</p>
        <p class="pages">${item.pages} Pages</p>
        <p class="btn yes ${item.read}">${item.read}</p>
        <p class="btn delete">Remove</p>
    </div>`;
    }).join("");
    bookCont.innerHTML = bookItems;
    removeBook()
}

function removeForm(){
    formCont.classList.remove('show');
}

function removeBook(){
    const remove = document.querySelectorAll(".delete");
    remove.forEach(btn => {
        btn.addEventListener('click', function(e){
            const bookList = Array.from(bookCont.childNodes)
            const title = bookList.indexOf(e.target.parentElement);
            myLibrary[title].delete();
        })
    })
}

const yr = new Date();
let year = yr.getFullYear();
date.textContent = year;


