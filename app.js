let addBook = document.querySelector('.add');
let formCont = document.querySelector('.form-container');
let bookCont = document.querySelector('.book-container');
let form = document.querySelector('form');
let inputs = document.querySelectorAll('.form input');
let toggle = document.querySelector('.toggle');
let btnContainer= document.querySelector('.btn-container');


// function to display the form container
addBook.addEventListener('click', function(e){
    formCont.classList.add('show')
})

let books = []

// takes care of populating the app
form.addEventListener('submit', function(e){
    e.preventDefault();
    formCont.classList.remove('show');
    books.push(retriever());
    displayBooks(books);
    resetInputs(inputs);
})


function retriever(){
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let view = toggle;

    function hasViewed(item){
        if(item.classList.contains('on')){
            return "read";
        }
        else{
            return "unread";
        }
    }
    
    return {title: `${title.value}`,
        author: `${author.value}`,
        pages: `${pages.value}`,
        view: hasViewed(toggle),
    };
}

function displayBooks(displayItem){
    let bookItems = displayItem.map(function(item){
        return `<div class="books">
        <p class="title">"${item.title}"</p>
        <p class="author">${item.author}</p>
        <p class="pages">${item.pages} Pages</p>
        <p class="btn ${item.view}">${item.view}</p>
        <p class="btn delete">Remove</p>
    </div>`;
    }).join("");
    bookCont.innerHTML = bookItems;
    deleteBook(bookCont);
}

btnContainer.addEventListener('click', function(e){
  toggle.classList.toggle('on');
})

function resetInputs(items){
    items.forEach(function(item){
        item.value = "";
    })
    toggle.classList.remove('on')
}

function deleteBook(value){
    const remove = value.querySelectorAll('.delete');
    remove.forEach(btn => {
        btn.addEventListener('click', function(e){
            const book = e.target.parentElement;
            book.remove();
            console.log(book)
        })
    })
}

const search = document.getElementById('search-box');

search.addEventListener('input', function(e){
    filBooks = books.filter(element => {
        let item = (element.title).toLowerCase();
        return item.includes((search.value).toLowerCase());
    });
    displayBooks(filBooks)
})

const date = document.querySelector('footer span');
const yr = new Date();
let year = yr.getFullYear();
date.textContent = year;

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function(e){
    formCont.classList.remove('show')
}) 
