const express = require('express')
const { protectedRoute } = require('../middlewares/authMiddleware')
const {
        createBook, 
        getAllBooks,
        updateMyBook,
        deleteMyBook,
        viewSingleBook,} = require('../controllers/bookkeepController')
const { bookRequest } = require('../controllers/bookRequest')
const { likeAndDislikeBook } = require('../controllers/likeAnsDislikeBook')

const router = express.Router()

// POST a book
// @route /api/v1/mylibrary/postbook
// Desc: (PRIVATE) a post request for posting a book
router.post('/postbook', protectedRoute, createBook)

// GET all books
// @route /api/v1/mylibrary/allbooks
// Desc: (PRIVATE) a get request for getting all books
router.get('/allbooks', protectedRoute, getAllBooks)

// GET a single book
// @route /api/v1/mylibrary/book/:id
// Desc: (PRIVATE) a get request for getting a single book
router.get('/:bookId', protectedRoute, viewSingleBook)

// POST a book request
// @route /api/v1/mylibrary/book/requestbook/:bookid
// Desc: (PRIVATE) a get request for getting a single book
router.patch('/requestbook/:bookId', protectedRoute, bookRequest)

// UPDATE my book
// @route /api/v1/mylibrary/books/updatebook/:id
// Desc: (PRIVATE) a patch request to update my books
router.patch('/updatebook/:id', protectedRoute, updateMyBook)

// DELETE my book
// @route /api/v1/mylibrary/user/update/:id
// Desc: (PRIVATE) a patch request to update my books
router.delete('/deletebook/:id', protectedRoute, deleteMyBook)

// DELETE my book
// @route /api/v1/mylibrary/user/update/:id
// Desc: (PRIVATE) a patch request to update my books
router.put('/likebook/:id', protectedRoute, likeAndDislikeBook)


module.exports = router