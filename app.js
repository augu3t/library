let addBook = document.querySelector('.add');
let formCont = document.querySelector('.form-container');
let bookCont = document.querySelector('.book-container');
let form = document.querySelector('form');
let inputs = document.querySelectorAll('.form input');
let toggle = document.querySelector('.toggle');
let btnContainer= document.querySelector('.btn-container');

//event listeners
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
});

//for read/unread btn
btnContainer.addEventListener('click', function(e){
    toggle.classList.toggle('on');
})

// filter books
const search = document.getElementById('search-box');
search.addEventListener('input', function(e){
    filBooks = books.filter(element => {
        let item = (element.title).toLowerCase();
        return item.includes((search.value).toLowerCase());
    });
    displayBooks(filBooks)
})

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function(e){
    formCont.classList.remove('show')
}) 


//functions
function retriever(){
    //to create the objects that get passed into the book array
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let view = toggle;
    
    return {title: `${title.value}`,
        author: `${author.value}`,
        pages: `${pages.value}`,
        view: hasViewed(toggle),
    };
}

function hasViewed(item){
    //for read/unread status
    if(item.classList.contains('on')){
        return "read";
    }
    else{
        return "unread";
    }
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
    //added this as a function to help in removing books
    deleteBook(bookCont);
}

function resetInputs(items){
    //to reset the form inputs
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

const date = document.querySelector('footer span');
const yr = new Date();
let year = yr.getFullYear();
date.textContent = year;
