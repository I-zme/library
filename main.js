let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here
}

const booksContainer = document.querySelector('.book-container');
function createBookHTML({ title, author, pages, read }) {
  const bookWrapper = document.createElement('div');
  bookWrapper.classList.add('book');
  const titlePara = document.createElement('para');
  titlePara.classList.add('title');
  titlePara.textContent = title;
  const authorPara = document.createElement('para');
  authorPara.classList.add('author');
  authorPara.textContent = author;
  const pagesPara = document.createElement('para');
  pagesPara.classList.add('pages');
  pagesPara.textContent = `${pages} pages`;
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
}
