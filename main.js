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
  const readDict = {
    read: 'read',
    reading: 'reading',
    'not-read': 'not read',
  };
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
  readBtn.classList.add('readability', read);
  readBtn.textContent = readDict[read];
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

// event listeners for book
const readBtns = document.querySelectorAll('.readability');
readBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
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
  });
});

// info container - dynamically enter number of books and their readability
