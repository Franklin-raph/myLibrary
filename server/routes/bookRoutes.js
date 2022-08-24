const express = require('express')
const { protectedRoute } = require('../middlewares/authMiddleware')
const {
        createBook, 
        getAllBooks,
        updateMyBook,
        deleteMyBook,
        viewSingleBook,
        viewSingleBookComments} = require('../controllers/bookkeepController')
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
router.get('/allbooks', protectedRoute, getAllBooks)

// GET a single book
// @route /api/v1/mylibrary/books/:bookId
// Desc: (PRIVATE) a get request for getting a single book
router.get('/:bookId', protectedRoute, viewSingleBook)

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
router.patch('/likebook/:id', protectedRoute, likeAndDislikeBook)

// GET a single book Comments
// @route /api/v1/mylibrary/books/bookcomments/:bookId
// Desc: (PRIVATE) a get request for getting a single book
router.get('/bookcomments/:bookId', protectedRoute, viewSingleBookComments)

// POST a comment
// @route /api/v1/mylibrary/books/comment/:bookId
// Desc: (PRIVATE) a get request for getting a single book
router.patch('/comment/:bookId', protectedRoute, createComment)

// DELETE a book comment
// @route /api/v1/mylibrary/books/comment/:bookId/:comment_id
// Desc: (PRIVATE) a get request for getting a single book
router.delete('/comment/:bookId/:commentId', protectedRoute, deleteMyComment)


module.exports = router



// {
//         "title":"good book 1",
//         "author":"Chinedu",
//         "publishedDate":"today",
//         "description":"food ifdificdn ijfijdficdi ifjdcjkn fcdxcjdfkcdjv dc jrjdfjcidjfvirdkvdjidjficdi dfvidjvidfjvidjivkfc jfcidjvjdvjkd c",
//         "bookGenre": "payload.bookGenre",
//         "tags": "payload.tags"
//       }