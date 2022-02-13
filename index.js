import { DateTime } from '/luxon';
import Book from './modules/book.js';

const form = document.querySelector('.add-book__form');
const [title, author] = form.elements;
const [navList, navAdd, navContact] = document.querySelectorAll('.nav__link');
const allBooks = document.querySelector('.all-books');
const addBook = document.querySelector('.add-book');
const contact = document.querySelector('.contact');
const divTime = document.querySelector('.clock__time');

const inputBook = {};
const bookObj = new Book();

if (localStorage.savedBooks) {
  bookObj.books = JSON.parse(localStorage.getItem('savedBooks'));
}

navList.addEventListener('click', () => {
  allBooks.classList.remove('hidden');
  addBook.classList.add('hidden');
  contact.classList.add('hidden');
});

navAdd.addEventListener('click', () => {
  addBook.classList.remove('hidden');
  allBooks.classList.add('hidden');
  contact.classList.add('hidden');
});

navContact.addEventListener('click', () => {
  contact.classList.remove('hidden');
  allBooks.classList.add('hidden');
  addBook.classList.add('hidden');
});

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(bookObj.books));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  bookObj.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

setInterval(() => {
  const dt = DateTime.now().toLocal();
  divTime.textContent = dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
}, 1000);

bookObj.displayBooks();
populateFields();
