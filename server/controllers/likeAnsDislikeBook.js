const Test = require('../models/testmodel')
const User = require('../models/User')
const mongoose  = require('mongoose')

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
            const removeIndex = postedBookData.likes
                .map(like => like.user.toString())
                .indexOf(signedInUser)

            postedBookData.likes.splice(removeIndex, 1)
            
            await postedBookData.save()
            return res.status(200).json({postedBookData, msg:"Book has been unliked"})

        }else if(postedBookData.likes.filter(like => like.user.toString() === signedInUser).length === 0){
            postedBookData.likes.unshift({user: signedInUser})
            await postedBookData.save()
            return res.status(200).json({postedBookData, msg:"Book has been liked"})
        }
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    likeAndDislikeBook,
}