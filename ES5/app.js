// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI() {}

// Add UI Prototype
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    // Create tr element
    const row = document.createElement('tr');

    // Insert cols 
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Delete UI Prototype
UI.prototype.removebookFromList = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function (message, className) {
    // Create div
    const div = document.createElement('div');

    // Add classes
    div.className = `alert ${className}`;

    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');

    // Get form
    const form = document.querySelector('#book-form');

    // Insert alert
    container.insertBefore(div, form);

    // Timeout alert
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Event Listener for add 
document.getElementById('book-form').addEventListener('submit', function(e) {
    
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;


    // Instantiate Book 
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Display Error
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to lsit
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book added successfully!', 'success');

        // Clear Fields
        ui.clearFields();
    }

    // prevent default behaviour (stops refresh on submit)
    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();

    // Delete Book
    ui.removebookFromList(e.target);

    // Show Alert
    ui.showAlert('Book has been removed!', 'success');

    e.preventDefault();
})