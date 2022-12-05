'use strict'

const PAGE_SIZE = 3
const STORAGE_KEY = 'bookDB'

let gPageIdx = 0
let gBooks = loadFromStorage(STORAGE_KEY) || createBooks()
let gFilterBy = { searchStr: '', maxPrice: Infinity, minRating: -Infinity }
console.log(gBooks);

function createBooks() {
    const books = [
        _createBook('Diary of a wimpy kid 6'),
        _createBook('Harry Potter 19'),
        _createBook('The road not taken')
    ]
    return books
}

function _createBook(title, price = getRandomInt(1, 10) * 10) {
    return {
        id: makeId(),
        title,
        price,
        rating: 0,
        description: makeLorem()
    }
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        return gPageIdx
    return gPageIdx
    }
}

function previousPage(){
    gPageIdx--
    if(gPageIdx * PAGE_SIZE >= 0) return gPageIdx
    return gPageIdx

}

function getBooks() {
    const books = gBooks.filter(book => {
        return (book.title.includes(gFilterBy.searchStr) && book.price < (gFilterBy.maxPrice) && book.rating > (gFilterBy.minRating))
    })

    var startIdx = gPageIdx * PAGE_SIZE
     return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    saveToStorage(STORAGE_KEY, gBooks)
}

function addBook(title, price) {
    const book = _createBook(title, price)
    gBooks.unshift(book)
    saveToStorage(STORAGE_KEY, gBooks)
    return book
}

function updateBook(bookId, bookPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = bookPrice
    saveToStorage(STORAGE_KEY, gBooks)
    return book
}

function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function setRating(bookId, value) {
    const book = getBookById(bookId)
    book.rating = (book.rating + value > 10 || book.rating + value < 0) ? book.rating : book.rating + value
    saveToStorage(STORAGE_KEY, gBooks)
}

function setBookFilter(key, value) {
    gFilterBy[key] = value
    // console.log('from service', 'key', key);
    // console.log('from service', 'value', value);
    // console.log('gFilter service', gFilterBy);
}

