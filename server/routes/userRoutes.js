const express = require('express')
const { protectedRoute } = require('../middlewares/authMiddleware')
const { registerUser, loginUser, getMyProfile, getAllUsers, updateMyprofile, createTest, getAllTest } = require('../controllers/userController')

const router = express.Router()

// POST a user
// @route /api/v1/mylibrary/create/user
// Desc: (PUBLIC) a post request for creating a new user
router.post('/create/user', registerUser)

// POST a user
// @route /api/v1/mylibrary/auth/user
// Desc: (PUBLIC) a post request for logining in an existing user
router.post('/auth/user', loginUser)

// GET my profile
// @route /api/v1/mylibrary/user/me
// Desc: (PRIVATE) a get request for getting my data
router.get('/user/me', protectedRoute, getMyProfile)

// GET all users
// @route /api/v1/mylibrary/allusers
// Desc: (PRIVATE) a get request for getting all users
router.get('/allusers', protectedRoute, getAllUsers)

// POST a test data
// @route /api/v1/mylibrary/post/test
// Desc: (PRIVATE) a post request for posting a test data
router.post('/post/test', protectedRoute, createTest)

// GET all test
// @route /api/v1/mylibrary/alltest
// Desc: (PRIVATE) a get request for getting all test
router.get('/allTest', protectedRoute, getAllTest)

// UPDATE my profile
// @route /api/v1/mylibrary/user/update/me
// Desc: (PRIVATE) a patch request to update my data
router.patch('/user/update/me/:id', protectedRoute, updateMyprofile)

module.exports = router