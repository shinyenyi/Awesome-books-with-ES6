import createBooksList from './modules/createBooksList.js';
import checkForBooks from './modules/checkForBooks.js';
import { DateTime } from './modules/luxon.js';

const booksListSection = document.querySelector('.books-list');
const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addBookButton = document.querySelector('.add-book-button');
const bookList = document.querySelector('.list');
const addNewBook = document.querySelector('.add-new');
const contact = document.querySelector('.contact');
const pageTitle = document.querySelector('.title');
const date = document.querySelector('.date');
const addBookSection = document.getElementById('add-book-section');
const contactSection = document.getElementById('contact-section');
const listBooksSection = document.getElementById('list-books-section');

date.innerText = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

const timeInterval = () => {
  setInterval(() => {
    date.innerText = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  }, 60000);
};

timeInterval();

bookList.onclick = (() => {
  listBooksSection.classList.remove('display-none');
  listBooksSection.classList.add('books');
  contactSection.classList.remove('contact-section');
  contactSection.classList.add('display-none');
  addBookSection.classList.remove('add-book');
  addBookSection.classList.add('display-none');
  pageTitle.innerText = 'All awesome books';
});

addNewBook.onclick = (() => {
  listBooksSection.classList.remove('books');
  listBooksSection.classList.add('display-none');
  contactSection.classList.remove('contact-section');
  contactSection.classList.add('display-none');
  addBookSection.classList.remove('display-none');
  addBookSection.classList.add('add-book');
  pageTitle.innerText = 'Add a new book';
});

contact.onclick = (() => {
  listBooksSection.classList.remove('books');
  listBooksSection.classList.add('display-none');
  contactSection.classList.remove('display-none');
  contactSection.classList.add('contact-section');
  addBookSection.classList.remove('add-book');
  addBookSection.classList.add('display-none');
  pageTitle.innerText = 'Contact information';
});

let books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));

createBooksList(books);
let bookIndex;

class Book {
  constructor(title, author, index) {
    this.title = title;
    this.author = author;
    this.index = index;
  }

  removeBook() {
    this.index = bookIndex;
    books.splice(this.index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
    createBooksList(books);
  }

  addBook() {
    if (books.length) {
      bookIndex = (books.length - 1);
    }
    this.author = inputAuthor.value;
    this.title = inputTitle.value;
    this.index = bookIndex;
    localStorage.setItem('books', JSON.stringify(books));
    books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
    createBooksList(books);
    inputAuthor.value = '';
    inputTitle.value = '';
  }
}

if (books.length) {
  bookIndex = (books.length - 1);
}

let newBook;
const createNewBook = () => {
  if (inputAuthor.value && inputTitle.value) {
    newBook = new Book(inputTitle.value, inputAuthor.value, bookIndex);
  }
};

addBookButton.onclick = (() => {
  createNewBook();
  if (newBook) {
    books.push(newBook);
    newBook.addBook();
  }
  window.location.reload();
  checkForBooks(books);
});

const removeBookButton = (index) => {
  if (index) {
    bookIndex = index;
  }

  newBook = new Book('', '', index);
  newBook.removeBook();
  window.location.reload();
  checkForBooks(books);
};

booksListSection.addEventListener('click', (e) => {
  if (e.target.name === 'remove-button') {
    removeBookButton(e.target.id);
  }
});

checkForBooks(books);