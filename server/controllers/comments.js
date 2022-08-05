const Book = require('../models/Bookkeep')
const User = require('../models/User')
const mongoose  = require('mongoose')

// create comment
const createComment = async (req, res) => {
    const { bookId } = req.params
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const signedInUser = await User.findById(req.user.id)

        const postedBookData = await Book.findById(bookId)

        if(postedBookData === null) return res.status(404).json({Msg: "Book not found"})

        if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({Err: "No such book found"})


            const newComment = {
                text: req.body.text,
                name:signedInUser.name,
                user: signedInUser._id.toString(),
            }
            console.log(newComment)

            await Book.findByIdAndUpdate(postedBookData._id, {
                $push:{comments:newComment}
            },{new:true})
            
            res.status(201).json(postedBookData)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}


// delete comment
const deleteMyComment = async (req, res) =>{
    const { bookId } = req.params
    const { commentId } = req.params
    console.log("comment id =>", commentId)
    try {

        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})

        const postedBookData = await Book.findById(bookId)

        if(postedBookData === null) return res.status(404).json({Msg: "Book not found"})

        if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({Err: "No such book found"})

        const comment = postedBookData.comments.find(comment => comment.id === req.params.commentId)
        if(!comment) return res.status(404).json({Msg: "Comment does not exist"})

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({Msg: "User not authorised"})
        }

        if(comment) comment.remove()

        await postedBookData.save()
            
        res.status(201).json({Msg: "Comment was successfully deleted"})
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    createComment,
    deleteMyComment,
}