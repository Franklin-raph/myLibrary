const express = require('express')
const { protectedRoute } = require('../middlewares/authMiddleware')
const {
        createBook, 
        getAllBooks,
        updateMyBook} = require('../controllers/bookkeepController')

const router = express.Router()

// POST a test data
// @route /api/v1/mylibrary/post/test
// Desc: (PRIVATE) a post request for posting a book
router.post('/postbook', protectedRoute, createBook)

// GET all test
// @route /api/v1/mylibrary/alltest
// Desc: (PRIVATE) a get request for getting all books
router.get('/allbooks', protectedRoute, getAllBooks)

// UPDATE my books
// @route /api/v1/mylibrary/user/update/me
// Desc: (PRIVATE) a patch request to update my books
router.patch('/updatebook/:id', protectedRoute, updateMyBook)



module.exports = router