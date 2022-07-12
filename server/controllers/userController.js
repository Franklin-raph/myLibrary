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

const createTest = async (req, res) => {
    const test = await Test.create({
        title: req.body.title,
        user: req.user.id
    })

    res.status(201).json(test)
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
            name, password, email,avatar
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

        if(user &&(await bcrypt.compare(password, user.password))){
            return res.status(200).json({user,token})
        }
    } catch (error) {
        return res.status(500).json({Err: error.message})
    }
}

// view my profile
const getMyProfile = async (req, res) => {

    try {
        const { _id, name, email } = await User.findById(req.user.id)

        const test = await Test.find({user: req.user.id})

        res.status(200).json({
            id:_id,name,email,test
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({Err: error.message})
    }
}

// update my profile
const updateMyprofile = async (req, res) => {
    const { id } = req.params
    const { email, name } = req.body

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such user found"})

        // checking if user already exists
        let userEmail = await User.findOne({email})
        if(userEmail) return res.status(400).json({msg:"User with this email already exists"})
        
        let userName = await User.findOne({name})
        if(userName) return res.status(400).json({msg:"User with this name already exists"})

        const updatedProfile = await User.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// Delete my profile
const deleteMyProfile = async (req, res) => {
    const { id } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such user found"})

        
    } catch (error) {
        
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

// view all test
const getAllTest = async (req, res) => {
    try {
        const allTest = await Test.find().sort({ createdAt: -1 })
        res.status(200).json(allTest)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMyProfile,
    updateMyprofile,
    getAllUsers,

    createTest,
    getAllTest,
    
}