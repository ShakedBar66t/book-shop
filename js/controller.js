'use strict'

renderBooks()

function renderBooks() {
    const elTBody = document.querySelector('tbody')
    const books = getBooks()
    const strHTMLs = books.map(books => {
        return `<tr>
        <td>${books.id}</td>
        <td>${books.title}</td>
        <td>${books.price + '$'}</td>
        <td>${books.rating}</td>
        <td>
        <table>
        <tbody>
        <tr>
        <td><button onclick="onReadBook('${books.id}')">Read</button></td>
        <td><button onclick="onUpdateBook('${books.id}')">Update</button></td>
        <td><button onclick="onRemoveBook('${books.id}')">Delete</button></td>
        </tr>
        </tbody>
        </table>
        </td>  
        </tr>`
    })
    elTBody.innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var title = prompt('Book title?')
    var price = +prompt('Book Price?')
    if (isNaN(price)) return alert('Use numbers only please!')
    addBook(title, price)
    renderBooks()
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    console.log(book);
    var bookPrice = +prompt('New price?', book.price)
    if (bookPrice && book.price !== bookPrice) {
        updateBook(bookId, bookPrice)
    }
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    renderModal(book)
}

function renderModal(book) {
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h1').innerText = book.title
    elModal.querySelector('h2 span').innerText = book.price
    elModal.querySelector('h3').innerText = book.description
    document.querySelector('.modal-wrapper').classList.remove('hidden')
    elModal.dataset.bookId = book.id
    elModal.querySelector('.quantity').innerText = book.rating

}

function onCloseModal() {
    document.querySelector('.modal-wrapper').classList.add('hidden')
    renderBooks()
}

function onSetRating(value) {
    var elModal = document.querySelector('.modal')
    const bookId = elModal.dataset.bookId
    const book = getBookById(bookId)
    setRating(bookId, value)
    renderModal(book)
}

function onSetBookFilter(key, value) {
    console.log('from controller', 'key', key);
    console.log('from controller', 'value', value);
    setBookFilter(key, value)   
    renderBooks() 

    const queryStringParams = `?searchStr=${gFilterBy.searchStr}&maxPrice=${gFilterBy.maxPrice}&minRating=${gFilterBy.minRating}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({path: newUrl}, '', newUrl)
}

function onNextPage(){
    nextPage()
    // const pageIdx = nextPage()
    // const elButton = document.querySelector('next-page-button')
    // if (pageIdx === gBooks.length -1){
    //     elButton.disabled = true
    // } else elButton.disabled = false
    renderBooks()
}

function onPreviousPage(){
    previousPage()
    // console.log('hello from on');
    // const pageIdx = previousPage()
    // const elButton = document.querySelector('prev-page-button')
    // if (pageIdx === 0) {
    //     elButton.disabled = true
    // } else elButton.disabled = false
    renderBooks()
}