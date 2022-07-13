const Test = require('../models/testmodel')
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
    const { title } = req.body
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({Err: "No such test found"})

        const updatedTest = await Test.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(updatedTest)
        
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    createBook,
    getAllBooks,
    updateMyBook,
    
}