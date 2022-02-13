const booksList = document.querySelector('.all-books__list');

const Book = class {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.books = [];
  }

  populateFields = () => {
    localStorage.setItem('savedBooks', JSON.stringify(this.books));
  };

  removeBook = (book) => {
    const result = this.books.filter((b) => b !== book);
    this.books = result;
    this.populateFields();
  };

  addBook = (newBook) => {
    this.books.push(newBook);
    this.populateFields();
    this.displayBooks();
  };

  displayBooks = () => {
    booksList.innerHTML = '';
    this.books.map((book) => {
      const bookDiv = document.createElement('tr');
      const elementBook = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';

      elementBook.textContent = `"${book.title}" by ${book.author}`;

      bookDiv.classList.add('book-container');
      bookDiv.appendChild(elementBook);
      bookDiv.appendChild(deleteBtn);

      booksList.appendChild(bookDiv);

      deleteBtn.addEventListener('click', () => {
        this.removeBook(book);
        booksList.removeChild(bookDiv);
      });

      return booksList;
    });
  };
};

export default Book;
