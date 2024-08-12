const titulo = document.querySelector('#titulo')
const autor = document.querySelector('#autor')
const genero = document.querySelector('#genero')
const ano = document.querySelector('#ano')
const rating = document.querySelector('#rating')
const bookForm = document.querySelector('#book-form')
const bookList = document.querySelector('#book-list')

function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || []
}

function setBooks(books) {
    localStorage.setItem('books', JSON.stringify(books))

}

function displayBooks() {
    bookList.innerHTML = ""
    const books = getBooks()
    for (const book of books) {
        addBookToList(book, books.indexOf(book))
    }
}
displayBooks()

function calcularRatingMedio(ratings) {
    const soma = ratings.reduce((acc, nota) => {
        return acc + nota
    }, 0)
    return (soma / ratings.length).toFixed(2)
}

function updateRating(e, index) {
    e.preventDefault()
    const newRating = document.querySelector(`#new-rating-${index}`).value
    const books = getBooks()
    const book = books[index]

    book.ratings.push(Number(newRating))
    book.rating = calcularRatingMedio(book.ratings)

    setBooks(books)
    bookList.innerHTML = ''
    displayBooks()
}

function showRatingForm(index) {
    const ratingForm = document.querySelector(`#rating-form-${index}`)
    ratingForm.style.display = 'block'
}

function addBookToList(book, index) {
    const li = document.createElement('li')

    li.innerHTML = `${book.titulo} por ${book.autor}, genero: ${book.genero},
    ano: ${book.ano}, nota: ${book.rating}
    <button onclick="showRatingForm(${index})">Add rating</button>
    <form class="rating-form" id="rating-form-${index}">
    <input type="number" id="new-rating-${index}" min="1" max="5">
    <button type="submit">Enviar</button>
    </form>`


    bookList.append(li)
    const formRating = document.querySelector(`#rating-form-${index}`)
    formRating.addEventListener('submit', (e) => updateRating(e, index))

}

function addBook(e) {
    e.preventDefault()
    const book = {
        "titulo": titulo.value,
        "autor": autor.value,
        "genero": genero.value,
        "ano": ano.value,
        "rating": rating.value,
        "ratings": []
    }
    const books = getBooks()
    books.push(book)
    setBooks(books)

    addBookToList(book, books.length - 1)
    limparCampos()
}

function limparCampos() {
    titulo.value = ''
    autor.value = ''
    genero.value = ''
    ano.value = ''
    rating.value = ''
    titulo.focus()

}



bookForm.addEventListener('submit', addBook)
