const User = require('../models/User')
const Test = require('../models/testmodel')
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
        let userEmail = await User.findOne({email})
        if(userEmail) return res.status(400).json({msg:"User with this email already exists"})

        let userName = await User.findOne({name})
        if(userName) return res.status(400).json({msg:"User with this name already exists"})

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
        const userDetails = await User.findById(req.user.id)
        console.log(userDetails._id)

        const test = await Test.find({user: req.user.id})

        if(!mongoose.Types.ObjectId.isValid(userDetails._id.toString())) return res.status(404).json({Err: "No such user found"})

        res.status(200).json({
            userDetails, test
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({Err: error.message})
    }
}

// update my profile
const updateMyprofile = async (req, res) => {

    const userId = req.params.id
    try {
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({Err: "No such user found"})

        const signedInUserId = await User.findById(req.user.id)
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
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({Err: "No such user found"})

        const signedInUserId = await User.findById(req.user.id)
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
        res.status(200).json(allUsers)
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
    getAllUsers
}