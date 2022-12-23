let readBtns = document.querySelectorAll('.readability');
let delBtns = document.querySelectorAll('.delete');
let editBtns = document.querySelectorAll('.edit');

let myLibrary = [];
let myBooksIndex = 0;

const addBookBtn = document.querySelector('#add-book');
const bookForm = document.querySelector('.book-form-container');
const booksContainer = document.querySelector('.book-container');
const readDict = {
  read: 'read',
  reading: 'reading',
  'not-read': 'not read',
};

(function () {
  myLibrary.forEach((book) => {
    let newBook = createBookHTML(book);
    addBookListeners(newBook);
  });
})();

function Book(title, author, pages, readability) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readability = readability;
  this.serial = `bk-${myBooksIndex}`;
}

// event listeners to pop up the book form for adding books and for closing it on clicking outside
addBookBtn.addEventListener('click', () => {
  bookForm.toggleAttribute('data-visible');
});

document.addEventListener('click', (e) => {
  if (bookForm.hasAttribute('data-visible')) {
    if (
      e.target.closest('.book-form button[type="submit"]') ||
      !(
        e.target.closest('.book-form-container') ||
        e.target.closest('.add-book') ||
        e.target.closest('.edit')
      )
    ) {
      if (bookForm.hasAttribute('data-edit')) {
        bookForm.removeAttribute('data-edit');
      }
      document.querySelector('.book-form').reset();
      bookForm.toggleAttribute('data-visible');
    }
  }
});

// adding book
document
  .querySelector('.book-form button[type="submit"]')
  .addEventListener('click', (e) => {
    e.preventDefault();
    if (bookForm.hasAttribute('data-edit')) {
      let id = bookForm.getAttribute('data-edit');
      let bookDiv = document.getElementById(id);
      const editBook = myLibrary.find((dict) => dict.serial === id);
      enterInputDetailsInLibrary(editBook);
      enterBookDetailsInHTML(bookDiv, editBook);
      bookForm.removeAttribute('data-edit');
    } else {
      addBookToLibrary();
    }
  });

function addBookToLibrary() {
  const newBook = new Book();
  enterInputDetailsInLibrary(newBook);
  myBooksIndex += 1;
  myLibrary.push(newBook);
  createBookHTML(newBook);
}

function enterInputDetailsInLibrary(book) {
  book.title = document.querySelector('.book-form input#bk-title').value;
  book.author = document.querySelector('.book-form input#bk-author').value;
  book.pages = document.querySelector('.book-form input#bk-pages').value;
  book.readability = document.querySelector(
    '.book-form select#bk-readability'
  ).value;
}

function enterBookDetailsInHTML(htmlBookDiv, libraryBook) {
  console.log(htmlBookDiv.querySelector('.title'), libraryBook.title);
  htmlBookDiv.querySelector('.title').textContent = libraryBook.title;
  htmlBookDiv.querySelector('.author').textContent = libraryBook.author;
  htmlBookDiv.querySelector(
    '.pages'
  ).textContent = `${libraryBook.pages} pages`;
  htmlBookDiv.querySelector('.readability').textContent =
    readDict[libraryBook.readability];
  htmlBookDiv
    .querySelector('.readability')
    .classList.add(libraryBook.readability);
}

// function to create the html of a book div with all its information
function createBookHTML(book) {
  const bookWrapper = document.createElement('div');
  bookWrapper.classList.add('book');
  bookWrapper.setAttribute('id', book.serial);
  const titlePara = document.createElement('para');
  titlePara.classList.add('title');
  const authorPara = document.createElement('para');
  authorPara.classList.add('author');
  const pagesPara = document.createElement('para');
  pagesPara.classList.add('pages');
  const readBtn = document.createElement('button');
  readBtn.classList.add('readability');
  const delBtn = document.createElement('button');
  delBtn.classList.add('delete');
  delBtn.textContent = 'Delete';
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.textContent = 'Edit';

  bookWrapper.append(
    titlePara,
    authorPara,
    pagesPara,
    readBtn,
    delBtn,
    editBtn
  );
  booksContainer.append(bookWrapper);
  enterBookDetailsInHTML(bookWrapper, book);

  return bookWrapper;
}

// DOM change event listeners
booksContainer.addEventListener('DOMNodeInserted', (e) => {
  if (e.relatedNode.classList.contains('book-container')) {
    addBookListeners(e.target);
  }
});

// book buttons event listeners
function readToggle(btn) {
  const btnClass = btn.classList[btn.classList.length - 1];
  switch (btnClass) {
    case 'read':
      btn.textContent = 'not read';
      btn.classList.add('not-read');
      break;
    case 'not-read':
      btn.textContent = 'reading';
      btn.classList.add('reading');
      break;
    case 'reading':
      btn.textContent = 'read';
      btn.classList.add('read');
      break;
  }
  btn.classList.remove(btnClass);
}

function delToggle(book) {
  booksContainer.removeChild(book);
}

function editToggle(book) {
  bookForm.toggleAttribute('data-visible');
  bookForm.setAttribute('data-edit', book.getAttribute('id'));
  const editBook = myLibrary.find(
    (dict) => dict.serial === book.getAttribute('id')
  );
  document.querySelector('.book-form input#bk-title').value = editBook.title;
  document.querySelector('.book-form input#bk-author').value = editBook.author;
  document.querySelector('.book-form input#bk-pages').value = editBook.pages;
  document.querySelector('.book-form select#bk-readability').value =
    editBook.readability;
}

function addBookListeners(book) {
  let btns = book.querySelectorAll('button');
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('delete')) {
        delToggle(book);
      } else if (btn.classList.contains('edit')) {
        editToggle(book);
      } else {
        readToggle(btn);
      }
    });
  });
}

// info container - dynamically enter number of books and their readability
