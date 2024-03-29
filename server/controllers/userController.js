const User = require('../models/User')
const Book = require('../models/Bookkeep')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const mongoose  = require('mongoose')

// generating the token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body

    try {
        // checking if user already exists
        let userName = await User.findOne({name})
        if(userName) return res.status(400).json({msg:"User with this name already exists"})

        let userEmail = await User.findOne({email})
        if(userEmail) return res.status(400).json({msg:"User with this email already exists"})

        // creating a default avatar image
        const avatar = gravatar.url(email, {
            s:'200',r:'pg',d:'mm'
        })

        // creating the user
        const user = new User({
            name, password, email, avatar
        })

        // Hashing the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // saving user to database
        user.save()

        const token = createToken(user._id)

        res.status(200).json({user,token})
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // checking if user exists or not
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({Err: "Invalid login credentials"})
        
        const token = createToken(user._id)

        if(user && (await bcrypt.compare(password, user.password))){
            return res.status(200).json({user,token})
        }else{
            res.status(400).json({Err: "Inavlid login credentials"})
        }
        // res.send({email, password, user})
    } catch (error) {
        return res.status(500).json({Err: error.message})
    }
}

// view my profile
const getMyProfile = async (req, res) => {
    
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})
        const user = await User.findById(req.user.id)
        
        const mybBooks = await Book.find({user: req.user.id})

        // Though this check below is not necessary because i am getting your id from the token being sent to you but then i would stil leave it there
        // for reference sake
        if(!mongoose.Types.ObjectId.isValid(user._id.toString())) return res.status(404).json({Err: "No such user found"})

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({Err: error.message})
    }
}

// view my books
const getMyBooks = async (req, res) => {
    
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})
        const user = await User.findById(req.user.id)
        
        const mybBooks = await Book.find({user: req.user.id})

        // Though this check below is not necessary because i am getting your id from the token being sent to you but then i would stil leave it there
        // for reference sake
        if(!mongoose.Types.ObjectId.isValid(user._id.toString())) return res.status(404).json({Err: "No such user found"})

        res.status(200).json(mybBooks)
    } catch (error) {
        console.log(error)
        res.status(500).json({Err: error.message})
    }
}

// update my profile
const updateMyprofile = async (req, res) => {

    const userId = req.params.id
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})
        const signedInUserId = await User.findById(req.user.id)

        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({Err: "No such user found"})

        if(userId !== signedInUserId._id.toString()) return res.status(401).json({Msg: "Not authorized"})

        const updatedProfile = await User.findOneAndUpdate({_id: userId}, {
            ...req.body
        })

        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// Delete my profile
const deleteMyProfile = async (req, res) => {

    const userId = req.params.id
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})
        const signedInUserId = await User.findById(req.user.id)

        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({Err: "No such user found"})

        if(userId !== signedInUserId._id.toString()) return res.status(401).json({Msg: "Not authorized"})

        await User.findOneAndDelete({_id: userId})
        res.status(200).json({Msg: "User's details deleted successfully"})
        
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// view all users
const getAllUsers = async (req, res) => {

    try {
        const allUsers = await User.find().sort({createdAt: -1})
        res.status(200).json({allUsers})
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

const viewAUsersProfile = async (req, res) => {

    const id = req.params.id

    try {

        // if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})
        // const signedInUserId = await User.findById(req.user.id)

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such user found"})

        const userProfile = await User.findById(id).select('-password')
        if(!userProfile) return res.status(404).json({Msg: "User not found"})
        
        res.status(200).json(userProfile)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMyProfile,
    updateMyprofile,
    deleteMyProfile,
    getAllUsers,
    viewAUsersProfile,
    getMyBooks
}