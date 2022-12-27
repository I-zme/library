let myLibrary = [
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    pages: 354,
    readability: 'read',
    serial: 'bk-0',
  },
];
let myBooksIndex = 1;

const addBookBtn = document.querySelector('#add-book');
const bookForm = document.querySelector('.book-form-container');
const booksContainer = document.querySelector('.book-container');
const readDict = {
  read: 'read',
  reading: 'reading',
  'not-read': 'not read',
};

const totalBooks = document.querySelector('#num-total');
const readBooks = document.querySelector('#num-read');
const readingBooks = document.querySelector('#num-reading');
const notreadBooks = document.querySelector('#num-not-read');

// NOTE: if adding books built into the library, remember to update the myBookIndex, otherwise the serial will repeat itself
(function () {
  myLibrary.forEach((book) => {
    let newBook = createBookHTML(book);
    addBookListeners(newBook);
  });
  updateTotalBooks();
  updateBookStatus();
})();

function Book(title, author, pages, readability) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readability = readability;
  this.serial = `bk-${myBooksIndex}`;
}

// event listeners to pop up the book form for adding books and for closing it on clicking outside or on close button
addBookBtn.addEventListener('click', () => {
  bookForm.toggleAttribute('data-visible');
});
document.addEventListener('click', (e) => {
  if (bookForm.hasAttribute('data-visible')) {
    if (
      //   e.target.closest('.book-form button[type="submit"]') ||
      e.target.closest('button#close') ||
      !(
        e.target.closest('.book-form-container') ||
        e.target.closest('.add-book') ||
        e.target.closest('.edit')
      )
    ) {
      if (bookForm.hasAttribute('data-edit')) {
        bookForm.removeAttribute('data-edit');
      }
      closenCleanForm();
    }
  }
});

function closenCleanForm() {
  document.querySelector('.book-form').reset();
  bookForm.toggleAttribute('data-visible');
  clearValidation();
}

// adding book
const validationMsgParas = document.querySelectorAll('.form-validation-msg');

document
  .querySelector('.book-form button[type="submit"]')
  .addEventListener('click', (e) => {
    formArray.forEach((dict) => {
      validateFormItem(dict.item, dict.errMsg);
    });
    const formValidity = Array.from(validationMsgParas).every(
      (item) => item.getAttribute('data-valid') === 'true'
    );

    if (!formValidity) return;
    else {
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
      document.querySelector('.book-form').reset();
      bookForm.toggleAttribute('data-visible');
      clearValidation();
    }
  });

document
  .querySelector('button[type="reset"]')
  .addEventListener('click', clearValidation);

function clearValidation() {
  validationMsgParas.forEach((p) => {
    p.removeAttribute('data-valid');
    p.textContent = '';
  });
}

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

// book form validation - since the submit button is operating as a regular button, there is no built in form validation. we have to add it ourselves. For best UX the validation happens as the user enters the details, making it easier to spot and correct errors. thus we'll be using event listeners.
const formTitle = document.querySelector('.book-form #bk-title');
const formAuthor = document.querySelector('.book-form #bk-author');
const formPages = document.querySelector('.book-form #bk-pages');
const formReadability = document.querySelector('.book-form #bk-readability');

const formArray = [
  {
    item: formTitle,
    errMsg: 'Name must contain 1-100 characters',
  },
  {
    item: formAuthor,
    errMsg: 'Name must contain 1-100 characters',
  },
  {
    item: formPages,
    errMsg: 'Number between 1-2000',
  },
  {
    item: formReadability,
    errMsg: 'Select status',
  },
];

formArray.forEach((dict) =>
  dict.item.addEventListener('focusout', () => {
    validateFormItem(dict.item, dict.errMsg);
  })
);

function validateFormItem(item, errMsg) {
  const validationMsgPara = item.parentElement.querySelector(
    '.form-validation-msg'
  );
  let validationMessage = '✓';
  let validationAttributeValue = true;
  let condition =
    item === formPages
      ? Number(formPages.value) < 1 || Number(formPages.value) > 2000
      : item.value === '';

  if (condition) {
    validationAttributeValue = false;
    validationMessage = '✖ ' + errMsg;
  }
  validationMsgPara.setAttribute('data-valid', validationAttributeValue);
  validationMsgPara.textContent = validationMessage;
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
  delBtn.classList.add('delete', '|', 'btn-with-bg');
  delBtn.textContent = 'Delete';
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit', '|', 'btn-with-bg');
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
    updateBookStatus();
  }
  updateTotalBooks();
});

booksContainer.addEventListener('DOMNodeRemoved', (e) => {
  if (e.relatedNode.classList.contains('book-container')) {
    let index = myLibrary.indexOf(
      myLibrary.find((book) => book.serial === e.target.getAttribute('id'))
    );
    myLibrary.splice(index, 1);
    updateBookStatus();
  }
  updateTotalBooks();
});

// book buttons event listeners
function readToggle(btn, book) {
  const btnClass = btn.classList[btn.classList.length - 1];
  let status;
  switch (btnClass) {
    case 'read':
      status = 'not-read';
      break;
    case 'not-read':
      status = 'reading';
      break;

    case 'reading':
      status = 'read';
      break;
  }
  btn.textContent = readDict[status];
  btn.classList.add(status);
  myLibrary.find(
    (item) => item.serial === book.getAttribute('id')
  ).readability = status;
  btn.classList.remove(btnClass);
  updateBookStatus();
}

function updateBookStatus() {
  displayBooksStatus(readBooks, 'read');
  displayBooksStatus(notreadBooks, 'not-read');
  displayBooksStatus(readingBooks, 'reading');

  function displayBooksStatus(spanBook, status) {
    spanBook.textContent = myLibrary.filter(
      (book) => book.readability === status
    ).length;
  }
}

function updateTotalBooks() {
  totalBooks.textContent = myLibrary.length;
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
        readToggle(btn, book);
      }
    });
  });
}
