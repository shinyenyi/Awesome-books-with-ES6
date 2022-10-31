const booksListSection = document.querySelector('.books-list');

const createBooksList = (books) => {
  let booksList = '';
  if (books) {
    books.forEach((book, index) => {
      booksList += `
        <li class="book">
          <div class="title-and-author">
            <p class="book-title">"${book.title}"</p>
            by
            <p class="book-author">${book.author}</p>
          </div>
          <button name="remove-button" id="${index}" class="remove-book-button">Remove</button>
        </li>
      `;
    });
  }

  booksListSection.innerHTML = booksList;
};

export default createBooksList;