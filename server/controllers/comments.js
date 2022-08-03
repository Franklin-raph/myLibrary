const Test = require('../models/testmodel')
const User = require('../models/User')
const mongoose  = require('mongoose')

// create comment
const createComment = async (req, res) => {
    const { bookId } = req.params
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const signedInUser = await User.findById(req.user.id)

        const postedBookData = await Test.findById(bookId)
        console.log(postedBookData)

        if(postedBookData === null) return res.status(404).json({Msg: "Book not found"})

        if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({Err: "No such book found"})

            const newComment = {
                text: req.body.text,
                name:signedInUser.name,
                avatar: signedInUser.avatar,
                user: signedInUser.id
            }

            postedBookData.comments.unshift(newComment)

            await postedBookData.save()
            res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}


// delete comment
const deleteMyComment = async (req, res) =>{
    const { bookId } = req.params

    try {
        
        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const signedInUser = await User.findById(req.user.id)

        const postedBookData = await Test.findById(bookId)
        if(!postedBookData) return res.status(400).json({Msg: "No such book found"})

        if(signedInUser._id.toString() !== postedBookData.user.toString()) return res.status(401).json({Msg: "User not authorized"})

        if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({Err: "No such book found"})

        // get the comment
        const comment = postedBookData.comments.find(
            comment => comment.id === req.params.comment_id
        )
        
        if(!comment) return res.status(404).json({Msg: "No comments"})
        await comment.remove()

        await postedBookData.save()
        return res.status(200).json({postedBookData, msg:"Comment has been deleted"})

    } catch (error) {
        res.status(500).json({Msg: error.message})
    }
}

module.exports = {
    createComment,
    deleteMyComment,
}