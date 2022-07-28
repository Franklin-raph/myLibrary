const User = require('../models/User')
const mongoose  = require('mongoose')


const followAndUnfollowUser = async (req, res) => {

    // take note, this followedUserId belongs to the user you want to follow
    const { followedUserId } = req.params
    try {
        if(await User.findById(req.user) === null) return res.status(404).json({Msg: "User not found"})
        
        // here i am getting the document of the signed in user form req.user
        let signedInUser = await User.findById(req.user._id)

        // here i am geting the document of the user that i want to follow using his/her id from the request params above
        let userThatIWantToFollow = await User.findById(followedUserId)

        if(!mongoose.Types.ObjectId.isValid(followedUserId)) return res.status(404).json({Err: "No such user found"})

        // checking if the users id is mine so i can'nt follow my self 
        if(followedUserId === signedInUser._id.toString()) return res.status(401).json({Msg: "User can not follow him or her self"})

        if(signedInUser.following.includes(followedUserId)){
            signedInUser = await User.findByIdAndUpdate(req.user._id, { $pull:{ following:followedUserId }}, { new:true })
            await userThatIWantToFollow.updateOne({ $pull:{ followers:signedInUser._id }})

            res.status(200).json({Msg: "You have unfollowed a user"})
        }else{
            signedInUser = await User.findByIdAndUpdate(req.user._id, { $push:{ following:followedUserId }}, { new:true })
            await userThatIWantToFollow.updateOne({ $push:{ followers:signedInUser._id }})

            res.status(200).json({Msg: "You have followed a user"})
        }

    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    followAndUnfollowUser,
}