/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */

const today = new Date().toUTCString();
const time = document.querySelector('.nav__para');
time.textContent = today;

const mainList = document.querySelector('.main__list');
const form = document.querySelector('.form');
const infoPage = document.querySelector('.info');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = new Date().valueOf().toString();
  }
}

const removeElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

class Library {
  constructor() {
    this.list = [];
  }

  removeBook(id) {
    this.list = this.list.filter((item) => item.id !== id);
    localStorage.setItem('library', JSON.stringify(this.list));
  }

  addBook(book) {
    this.list.push(book);
  }

  updateDom() {
    const list = document.querySelector('.listing');
    removeElement(list);
    this.list.forEach((el) => {
      const book = document.createElement('li');
      const rmBtn = document.createElement('button');
      rmBtn.innerHTML = 'remove';
      book.innerHTML = `${el.title} by ${el.author}`;
      book.classList.add('book-item');
      rmBtn.classList.add('remove-book');
      book.appendChild(rmBtn);
      list.appendChild(book);
      rmBtn.addEventListener('click', () => {
        this.removeBook(el.id);
        book.remove(book.id);
      });
    });
  }
}

const toggleInfo = (page) => {
  switch (page) {
    case 'list':
      infoPage.classList.add('none');
      form.classList.add('none');
      mainList.classList.remove('none');
      break;
    case 'add':
      infoPage.classList.add('none');
      form.classList.remove('none');
      mainList.classList.add('none');
      break;
    case 'info':
      form.classList.add('none');
      mainList.classList.add('none');
      infoPage.classList.remove('none');
      break;
    default:
  }
};

const Lib = new Library();

const addBtn = document.querySelector('.form__btn');
addBtn.addEventListener('click', () => {
  const BookTitle = document.querySelector('.form__title').value;
  const BookAuthor = document.querySelector('.form__author').value;

  const book = new Book(BookTitle, BookAuthor);
  Lib.addBook(book);
  Lib.updateDom();
  localStorage.setItem('library', JSON.stringify(Lib.list));
});

window.onload = () => {
  Lib.list = JSON.parse(localStorage.getItem('library' || '[]'));
  if (Lib.list === null) {
    Lib.list = [];
    return;
  }
  Lib.updateDom();
  infoPage.classList.add('none');
  form.classList.add('none');
  mainList.classList.remove('none');
};

/* eslint-enable max-classes-per-file */
/* eslint-disable no-unused-vars */
