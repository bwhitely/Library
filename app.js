// Library
let library = [];

// Book object constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Document elements
let table = document.querySelector('tbody');
let origTable = table.innerHTML;
const submit = document.getElementById("submitBtn");
let form = document.getElementById("new_book_form");

// On form submit
// Gather book values, create new Book and add to library, populate table with new book and reset form.
form.addEventListener('submit', (e) => {
    let title = document.getElementById("title_input").value;
    let author = document.getElementById("author_input").value;
    let pages = document.getElementById("pages_input").value;
    let read = document.getElementById("read_input").value;

    let newBook = new Book(title, author, pages, read);

    addBook(newBook);

    populateTable();

    form.reset();
})

// Add book to library array
const addBook = (book) => {
    library.push(book);
}

// Populate HTML table with existing books
const populateTable = () => {
    // reset table
    table.innerHTML = origTable;
    // populate table
    for (let i = 0; i < library.length; i++){
        createTableNode(library[i].title, library[i].author, library[i].pages, library[i].read, i);
    }
}

const changeReadStatus = (book) => {
    if (book.read == 'Yes') book.read = "No";
    else if (book.read == "No") book.read = "Yes";
}

// Constructs a table node to be appended to the table element
const createTableNode = (title, author, pages, read, index) => {
    // Make delete button
    let btnRow = document.createElement('td');
    let btn = document.createElement('button');
    btn.id = "deleteBtn";
    btn.type = "button";
    btn.className = "btn btn-danger";
    btn.textContent = "Delete";
    btn.style = "padding: revert";
    btnRow.appendChild(btn);

    // Make read toggle
    let readRow = document.createElement('td');
    let readBox = document.createElement('button');
    readBox.id = "readCheck";
    readBox.type = "button";
    readBox.className = "btn btn-dark";
    readBox.textContent = "Read"
    readBox.style = "padding: revert";
    readRow.appendChild(readBox);

    // Read toggle event listener
    readBox.addEventListener('click', (e) => {
        console.log(e.target.parentNode.parentNode);
        let b = e.target.parentNode.parentNode.getAttribute('data-key');
        
        changeReadStatus(library[b]);
        populateTable();
    })

    // Delete button event listener
    btn.addEventListener('click',(e) => {
        let x = e.target.parentNode;
        console.log(x);

        let b = x.getAttribute('data-key');
        
        library.splice(Number(b), 1);

        x.parentNode.remove();
        populateTable();
    })

    // Create rest of table elements, append to parent node, append parent to HTML
    let tr = document.createElement('tr');
    tr.setAttribute('data-key', index);

    let n1 = document.createElement('td');
    let n2 = document.createElement('td');
    let n3 = document.createElement('td');
    let n4 = document.createElement('td');
    let title_node = document.createTextNode(`"${title}"`);
    let author_node = document.createTextNode(author);
    let pages_node = document.createTextNode(pages);
    let read_node = document.createTextNode(read);

    n1.appendChild(title_node);
    n2.appendChild(author_node);
    n3.appendChild(pages_node);
    n4.appendChild(read_node);

    tr.appendChild(btnRow);
    tr.appendChild(n1);
    tr.appendChild(n2);
    tr.appendChild(n3);
    tr.appendChild(n4);
    tr.appendChild(readRow);

    table.appendChild(tr);
}