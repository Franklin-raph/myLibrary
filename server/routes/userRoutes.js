const express = require('express')
const { protectedRoute } = require('../middlewares/authMiddleware')
const { registerUser,
        loginUser,
        getMyProfile,
        getAllUsers,
        updateMyprofile,
        deleteMyProfile,
        viewAUsersProfile} = require('../controllers/userController')

const router = express.Router()

// POST a user
// @route /api/v1/mylibrary/auth/signup
// Desc: (PUBLIC) a post request for creating a new user
router.post('/auth/signup', registerUser)

// POST a user
// @route /api/v1/mylibrary/auth/signin
// Desc: (PUBLIC) a post request for logining in an existing user
router.post('/auth/signin', loginUser)

// GET my profile
// @route /api/v1/mylibrary/user/me
// Desc: (PRIVATE) a get request for getting my data
router.get('/user/me', protectedRoute, getMyProfile)

// GET all users
// @route /api/v1/mylibrary/allusers
// Desc: (PRIVATE) a get request for getting all users
router.get('/allusers', protectedRoute, getAllUsers)

// GET a user
// @route /api/v1/mylibrary/allusers/user/:id
// Desc: (PRIVATE) a get request for getting a user
router.get('/allusers/user/:id', protectedRoute, viewAUsersProfile)

// UPDATE my profile
// @route /api/v1/mylibrary/user/update/me
// Desc: (PRIVATE) a patch request to update my data
router.patch('/user/update/me/:id', protectedRoute, updateMyprofile)

// DELETE my profile
// @route /api/v1/mylibrary/user/update/me
// Desc: (PRIVATE) a delete request to delete my data
router.delete('/user/delete/me/:id', protectedRoute, deleteMyProfile)

module.exports = router