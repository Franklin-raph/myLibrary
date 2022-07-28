const Test = require('../models/testmodel')
const User = require('../models/User')
const mongoose  = require('mongoose')

// create Book
const createBook = async (req, res) => {
    const test = await Test.create({
        title: req.body.title,
        tags: req.body.tags.split(",").map(tag => tag.trim()),
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
    // const { id } = req.params
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const signedInUser = await User.findById(req.user.id)

        const postedBookData = await Test.findById(req.params.id)

        // if(postedBookData === null) return res.status(404).json({Msg: "Book not found"})
        if(!postedBookData) return res.status(400).json({Msg: "No such book found"})

        if(signedInUser._id.toString() !== postedBookData.user.toString()) return res.status(401).json({Msg: "User not authorized"})

        if(!mongoose.Types.ObjectId.isValid(postedBookData)) return res.status(404).json({Err: "No such book found"})

        const updatedBook = await Test.findOneAndUpdate({_id: postedBookData}, {
            ...req.body
        })
        res.status(200).json(updatedBook)
        
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// delete book
const deleteMyBook = async (req, res) =>{
    const { id } = req.params

    try {
        
        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const signedInUser = await User.findById(req.user.id)

        const postedBookData = await Test.findById(req.params.id)
        if(!postedBookData) return res.status(400).json({Msg: "No such book found"})

        if(signedInUser._id.toString() !== postedBookData.user.toString()) return res.status(401).json({Msg: "User not authorized"})

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such book found"})

        await Test.findOneAndDelete({_id: id})
        res.status(200).json({Msg: "Book successfully deleted"})

    } catch (error) {
        res.status(500).json({Msg: error.message})
    }
}


// View a single book
const viewSingleBook = async (req, res) => {

    const { bookId } = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({Err: "No such book found"})

        const book = await Test.findById(bookId)
        if(!book) return res.status(404).json({Msg: "Book not found"})
        res.status(200).json({book})

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    createBook,
    getAllBooks,
    updateMyBook,
    deleteMyBook,
    viewSingleBook,
}