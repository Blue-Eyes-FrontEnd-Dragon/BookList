class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</td>
        `;

        list.appendChild(row);
    }

    removeBookFromList(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);

    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }


}

document.querySelector('#book-form').addEventListener('submit', (e) => {

    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields.', 'error');
    } else {
        ui.addBookToList(book);
        ui.showAlert('Book added successfully!', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    const ui = new UI();
    
    ui.removeBookFromList(e.target);
    ui.showAlert('Book has been removed!', 'success');

    e.preventDefault();
});