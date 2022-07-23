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

// like and dislike book
const likeAndDislikeBook = async (req, res) => {
    const { id } = req.params
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const signedInUser = (await User.findById(req.user.id))._id.toString()

        const postedBookData = await Test.findById(req.params.id)

        if(postedBookData === null) return res.status(404).json({Msg: "Book not found"})

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such book found"})

        if(postedBookData.likes.filter(like => like.user.toString() === signedInUser).length > 0){
            const removeIndex = postedBookData.likes.map(like => like.user.toString()).indexOf(signedInUser)
            postedBookData.likes.splice(removeIndex, 1)
            await postedBookData.save()
            return res.status(200).json({postedBookData, msg:"Book has been unliked"})

        }else if(postedBookData.likes.filter(lik => lik.user.toString() === signedInUser).length === 0){
            postedBookData.likes.unshift({user: signedInUser})
            await postedBookData.save()
            return res.status(200).json({postedBookData, msg:"Book has been liked"})
        }
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}



module.exports = {
    createBook,
    getAllBooks,
    updateMyBook,
    deleteMyBook,
    likeAndDislikeBook,

}