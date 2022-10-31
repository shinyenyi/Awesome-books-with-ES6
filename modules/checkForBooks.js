const noBooks = document.getElementById('no-books');

const checkForBooks = (books) => {
  if (books.length === 0) {
    noBooks.classList.add('display');
    noBooks.classList.remove('display-none');
  } else {
    noBooks.classList.add('display-none');
    noBooks.classList.remove('display');
  }
};

export default checkForBooks;