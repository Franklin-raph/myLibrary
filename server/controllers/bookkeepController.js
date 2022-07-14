const Test = require('../models/testmodel')
const User = require('../models/User')
const { updateMyprofile } = require('./userController')
const mongoose  = require('mongoose')

// create Book
const createBook = async (req, res) => {
    const test = await Test.create({
        title: req.body.title,
        user: req.user.id
    })
    res.status(201).json(test)
}

// view all Books
const getAllBooks = async (req, res) => {
    try {
        const allTest = await Test.find().sort({ createdAt: -1 })
        res.status(200).json(allTest)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// update Book
const updateMyBook = async (req, res) => {
    const { id } = req.params
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const signedInUserId = await User.findById(req.user.id)

        const postedBookId = await Test.findById(req.params.id)

        if(signedInUserId._id.toString() !== postedBookId.user.toString()) return res.status(401).json({Msg: "User not authorized"})

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such book found"})

        const updatedTest = await Test.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(updatedTest)
        
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// delete book
const deleteMyBook = async (req, res) =>{
    const { id } = req.params

    try {
        
        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const signedInUserId = await User.findById(req.user.id)

        const postedBookId = await Test.findById(req.params.id)

        if(signedInUserId._id.toString() !== postedBookId.user.toString()) return res.status(401).json({Msg: "User not authorized"})

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such book found"})

        await Test.findOneAndDelete({_id: id})
        res.status(200).json({Msg: "Book successfully deleted"})

    } catch (error) {
        res.status(500).json({Msg: error.message})
    }
}

// like book
const likeBook = async (req, res) => {
    
}

module.exports = {
    createBook,
    getAllBooks,
    updateMyBook,
    deleteMyBook
}