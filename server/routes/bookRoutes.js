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
const { createComment, deleteMyComment } = require('../controllers/comments')

const router = express.Router()

// POST a book
// @route /api/v1/mylibrary/postbook
// Desc: (PRIVATE) a post request for posting a book
router.post('/postbook', protectedRoute, createBook)

// GET all books
// @route /api/v1/mylibrary/allbooks
// Desc: (PRIVATE) a get request for getting all books
router.get('/allbooks', getAllBooks)

// GET a single book
// @route /api/v1/mylibrary/books/:bookId
// Desc: (PRIVATE) a get request for getting a single book
router.get('/:bookId', viewSingleBook)

// UPDATE my book
// @route /api/v1/mylibrary/books/updatebook/:id
// Desc: (PRIVATE) a patch request to update my books
router.patch('/updatebook/:id', protectedRoute, updateMyBook)

// DELETE my book
// @route /api/v1/mylibrary/books/deletebook/:id
// Desc: (PRIVATE) a patch request to update my books
router.delete('/deletebook/:id', protectedRoute, deleteMyBook)

// POST a book request
// @route /api/v1/mylibrary/books/requestbook/:bookid
// Desc: (PRIVATE) a get request for getting a single book
router.patch('/requestbook/:bookId', protectedRoute, bookRequest) //not implemented yet

// UPDATE my book
// @route /api/v1/mylibrary/books/likebook/:id
// Desc: (PRIVATE) a put request to update my books
router.put('/likebook/:id', protectedRoute, likeAndDislikeBook)

// POST a comment
// @route /api/v1/mylibrary/books/comment/:bookId
// Desc: (PRIVATE) a get request for getting a single book
router.patch('/comment/:bookId', protectedRoute, createComment)

// DELETE a book comment
// @route /api/v1/mylibrary/books/comment/:bookId/:comment_id
// Desc: (PRIVATE) a get request for getting a single book
router.delete('/comment/:bookId/:commentId', protectedRoute, deleteMyComment)


module.exports = router