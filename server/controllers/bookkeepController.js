const Book = require('../models/Bookkeep')
const Comment =  require('../models/Comments')
const User = require('../models/User')
const mongoose  = require('mongoose')
// const { ObjectId } = require('mon')

// create Book
const createBook = async (req, res) => {
    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        tags: req.body.tags.split(",").map(tag => tag.trim()),
        user: req.user.id,
        publishedDate: req.body.publishedDate,
        description: req.body.description,
        bookGenre: req.body.bookGenre,
    })
    res.status(201).json(book)
}

// view all Books
const getAllBooks = async (req, res) => {
    try {
        const allBook = await Book.find().sort({ createdAt: -1 })
        res.status(200).json(allBook)
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

        const postedBookData = await Book.findById(req.params.id)

        // if(postedBookData === null) return res.status(404).json({Msg: "Book not found"})
        if(!postedBookData) return res.status(400).json({Msg: "No such book found"})

        if(signedInUser._id.toString() !== postedBookData.user.toString()) return res.status(401).json({Msg: "User not authorized"})

        if(!mongoose.Types.ObjectId.isValid(postedBookData)) return res.status(404).json({Err: "No such book found"})

        const updatedBook = await Book.findOneAndUpdate({_id: postedBookData}, {
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

        const postedBookData = await Book.findById(req.params.id)
        if(!postedBookData) return res.status(400).json({Msg: "No such book found"})

        if(signedInUser._id.toString() !== postedBookData.user.toString()) return res.status(401).json({Msg: "User not authorized"})

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such book found"})

        await Book.findOneAndDelete({_id: id})
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

        const book = await Book.findById(bookId)
        if(!book) return res.status(404).json({Msg: "Book not found"})

        // const comment = await Comment.findById(book)
        // console.log(comment)
        // if(!comment) return res.status(404).json({Msg: "No comments for this book"})

        const bookWasPostedBy = await User.findById(book.user.toString()).select('-password')
        // if(!bookWasPostedBy) return res.status(404).json({Msg: "No User"})
        
        res.status(200).json({book, bookWasPostedBy})

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