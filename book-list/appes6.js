class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
}}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');

        //create tr element
        const row = document.createElement('tr');
    
        //insert columns
        row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href = '#' class = 'delete'>X</a></td>
        `;
        list.appendChild(row); 
    
    }

    showAlert(message, className){

        //creating a div to show the message

        const div = document.createElement('div');
        
        
        div.className = `alert ${className}`;

        // Adding text

        div.appendChild(document.createTextNode(message));

        //get parent
        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // timeout after 3sec

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);


        }

    deleteBook(target) {
        if(target.className === 'delete'){
     
            target.parentElement.parentElement.remove();
        }

    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


// Local Storage Class:
class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books' === null)){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }

    static displayBooks(){
        const books = Store.getBooks();
        const ui = new UI();
        books.forEach(book => ui.addBookToList(book));
       
        

    }
    static addBook(book){
        const books = Store.getBooks();
        
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn, index){
        const books = Store.getBooks();
        books.forEach(function (book, index){ 
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));


    }
}

//Event Listners

//document.addEventListener('DOMContentLoaded', (()=>document.querySelector('table').style.display = 'none'))
document.addEventListener('DOMContentLoaded', Store.displayBooks());


// Event Listener For add book
document.getElementById('book-form').addEventListener('submit', function(e){

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    //creating a book from the input using the book constructor
    //meaning we are fucking instantiate     
    const book = new Book(title, author, isbn);
    
    // Instantiate UI
    const ui = new UI();

    //validation

    if(title === ''|| author === '' || isbn === ''){
        ui.showAlert('Please Fill In All The Fields', 'error');


    } else {
        //Add book to list

            ui.addBookToList(book);

            Store.addBook(book);
            document.querySelector('table').style.display = 'block';
            ui.showAlert('Book Added', 'success')

            ui.clearFields();

    }

    
    e.preventDefault();


});

// Event Listener For delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    

    
    ui.showAlert('Book Deleted', 'success')
    
    e.preventDefault();
});