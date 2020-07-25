document.addEventListener('DOMContentLoaded', () => {
   const newBookForm = document.querySelector("#new-book");
const close = document.getElementById("close");
const button = document.querySelector("#add-book");
const ContainerR = document.querySelector("#booksR-container");
const ContainerNr = document.querySelector("#booksNr-container");
let forStorage = "";
let myLibrary = [];
class Book {
  //this creates the book values
  constructor(tittle, author, pages, read) {
    this.tittle = tittle;
    this.author = author;
    this.pages = pages;

    if (read == "true") {
      //this one is important for the storage
      this.read = true;
    } else if (read == "false") {
      this.read = false;
    } else {
      this.read = read;
    }
  }
  get toString() {
    return (
      this.tittle +
      "    " +
      this.author +
      "    " +
      this.pages +
      "    " +
      this.read
    );
  } //important to transform into a string
}
showcase = localStorage.getItem("books"); //checking storage

if (showcase != null) {
  //really checking storage
  showcase = showcase.trim(); //fixing everything
  forStorage = showcase;
  showcase = showcase.split("       ");

  for (i = 0; i < showcase.length; i++) {
    acomodating = showcase[i].split("    ");
    const oldBooks = new Book(
      acomodating[0],
      acomodating[1],
      acomodating[2],
      acomodating[3]
    );

    if (oldBooks.tittle != "") {
      myLibrary.push(oldBooks);
      createEntry(myLibrary);
    }
  }
}
newBookForm.addEventListener("submit", addBook); //adding a book
button.addEventListener("click", () => {
  document.getElementById("book-pages").style.backgroundColor = "white";
  document.getElementById("book-author").style.backgroundColor = "white";
  document.getElementById("book-name").style.backgroundColor = "white";
  newBookForm.style.display = "block";
  //to see the questionary
});
close.addEventListener("click", () => {
  //cancel buton
  newBookForm.reset();
  newBookForm.style.display = "none";
});

function addBook(e) {
  //imputing formulary
  e.preventDefault();
  //getting the values
  const tittle = document.getElementById("book-name").value.trim();
  const author = document.getElementById("book-author").value.trim();
  const pages = document.getElementById("book-pages").value.trim();
  const read = document.getElementById("book-read").checked;
  if (isNaN(pages)) {
    //it nees to be anumber on pages
    document.getElementById("book-pages").value = "";
    document.getElementById("book-pages").placeholder = "Use a number";
    document.getElementById("book-pages").style.backgroundColor = "#f67b7b";
    return;
  }
  spaceT = tittle.indexOf(" "); //important to format the string
  spaceA = author.indexOf(" "); //important to format the string
  dobleSpaceT = tittle.indexOf("  "); //to stop doble space
  dobleSpaceA = author.indexOf("  "); //to stop doble space
  dobleSpaceP = pages.indexOf("  "); //to stop doble space

  if (dobleSpaceT != -1) {
    //doble space check magic

    document.getElementById("book-name").value = "";
    document.getElementById("book-name").placeholder = "Don't use doble space";
    document.getElementById("book-name").style.backgroundColor = "#f67b7b";
    return;
  } else if (dobleSpaceA != -1) {
    document.getElementById("book-author").value = "";
    document.getElementById("book-author").placeholder =
      "Don't use doble space";
    document.getElementById("book-author").style.backgroundColor = "#f67b7b";
    return;
  } else if (dobleSpaceP != -1) {
    document.getElementById("book-pages").value = "";
    document.getElementById("book-pages").placeholder = "Don't use doble space";
    document.getElementById("book-pages").style.backgroundColor = "#f67b7b";
    return;
  }

  if (tittle.length > 15) {
    //we want to break it into words not a big string with no spaces
    if (spaceT == -1 || spaceT > 15) {
      document.getElementById("book-name").value = "";
      document.getElementById("book-name").placeholder = "Use white spaces";
      document.getElementById("book-name").style.backgroundColor = "#f67b7b";
      return;
    }
  }
  if (author.length > 15) {
    //same here
    if (spaceA == -1 || spaceA > 15) {
      document.getElementById("book-author").value = "";
      document.getElementById("book-author").placeholder = "Use white spaces";
      document.getElementById("book-author").style.backgroundColor = "#f67b7b";
      return;
    }
  }

  if (tittle == "" || author == "" || pages == "") {
    //check if not empty
    if (tittle == "") {
      document.getElementById("book-name").style.backgroundColor = "#f67b7b";
    } else {
      document.getElementById("book-name").style.backgroundColor = "white";
    }
    if (author == "") {
      document.getElementById("book-author").style.backgroundColor = "#f67b7b";
    } else {
      document.getElementById("book-author").style.backgroundColor = "white";
    }
    if (pages == "") {
      document.getElementById("book-pages").style.backgroundColor = "#f67b7b";
    } else {
      document.getElementById("book-pages").style.backgroundColor = "white";
    }
    return;
  }

  tittleA = tittle.split(" "); //sorting the words to make them look good
  authorA = author.split(" "); //sorting the words to make them look good
  let tittleR = "";
  let authorR = "";
  for (let i = 0; i < tittleA.length; i++) {
    tittleR =
      tittleR +
      tittleA[i].slice(0, 1).toUpperCase() +
      tittleA[i].substring(1).toLowerCase() +
      " ";
  }
  tittleR = tittleR.trim();
  for (let i = 0; i < authorA.length; i++) {
    authorR =
      authorR +
      authorA[i].slice(0, 1).toUpperCase() +
      authorA[i].substring(1).toLowerCase() +
      " ";
  }
  authorR = authorR.trim();
  //reset the form
  newBookForm.reset();
  let newBook = new Book(tittleR, authorR, pages, read); //constructing the book
  myLibrary.push(newBook);

  forStorage = newBook.toString + "       " + forStorage;
  localStorage.setItem("books", forStorage); //local storage
  createEntry(myLibrary); //to create the book
  newBookForm.style.display = "none"; //closing the form
  return;
}

function createEntry(myLibrary) {
  //this one creates the normal entry

  m = myLibrary.length - 1; //gives m the corresponding value
  createCard(m); //creates the card
}

function createCard(m) {
  const bookCard = document.createElement("div"); //setting the values
  bookCard.setAttribute("id", m);
  bookCard.style.color = "black";
  bookCard.classList.add("Book-Card");

  const bookTittle = document.createElement("div"); //setting the values
  bookTittle.classList.add("Tittle");
  bookTittle.textContent = myLibrary[m].tittle;
  bookCard.appendChild(bookTittle);

  const bookAuthor = document.createElement("div"); //setting the values
  bookAuthor.classList.add("Author");
  bookAuthor.textContent = myLibrary[m].author;
  bookCard.appendChild(bookAuthor);

  const bookPages = document.createElement("div"); //setting the values
  bookPages.classList.add("Pages");
  bookPages.textContent = myLibrary[m].pages + " Pages";
  bookCard.appendChild(bookPages);

  const bookDelete = document.createElement("button"); //to delete
  bookDelete.innerHTML = "Remove";

  bookCard.appendChild(bookDelete);

  if (myLibrary[m].read) {
    bookCard.style.backgroundColor = "brown"; //deciding its places

    ContainerR.appendChild(bookCard);
  } else {
    bookCard.style.backgroundColor = "lightblue";

    ContainerNr.appendChild(bookCard);
  }

  bookCard.addEventListener("click", (bookCard) => {
    //to change their place on click
    const firstCheckId = bookCard.target.parentElement.getAttribute("id");
    let id = "";
    if (
      firstCheckId == "booksR-container" ||
      firstCheckId == "booksNr-container"
    ) {
      id = bookCard.target.getAttribute("id"); //looks for the id of the item
    } else {
      id = firstCheckId;
    }
    const Card = document.getElementById(id);
    if (Card == null) {
      //it is carefull if its null, this happens when pressing remove button becuse it is also in the card and loops here
      return;
    }
    newBook = myLibrary[id]; //for the database
    changeBook = newBook.toString; //same
    if (Card.style.backgroundColor == "brown") {
      ContainerR.removeChild(Card);
      myLibrary[id].read = false; //checks the bacrgrond color to know its current location and change it

      createCard(id); //we recreate the item with a the same id but other location
    } else {
      ContainerNr.removeChild(Card);
      myLibrary[id].read = true;
      createCard(id); //same as above
    }
    newBook = myLibrary[id]; //for the database
    replaceBook = newBook.toString;

    forStorage = forStorage.replace(changeBook, replaceBook);
    localStorage.setItem("books", forStorage);
  });

  bookDelete.addEventListener("click", (del) => {
    //to delete

    const id = del.target.parentElement.getAttribute("id");
    const Card = document.getElementById(id);
    newBook = myLibrary[id];
    removeBook = newBook.toString;
    if (Card.style.backgroundColor == "brown") {
      ContainerR.removeChild(Card);
      myLibrary.splice(id, 1);
    } else {
      ContainerNr.removeChild(Card);
      myLibrary.splice(id, 1);
    }
    forStorage = forStorage.replace(removeBook, "");
    localStorage.setItem("books", forStorage); //data base
  });
}


});