const Test = require('../models/testmodel')
const User = require('../models/User')
const mongoose  = require('mongoose')

// book request
const bookRequest = async (req, res) =>{

    const { bookId } = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({Err: "No such book found"})

        const signedInUser = (await User.findById(req.user.id))
        console.log(signedInUser)

        const requestedBook = await Test.findById(bookId)
        console.log(requestedBook)

        if(requestedBook.user.toString() === signedInUser._id.toString()) return res.status(401).json({Msg: "User can not request a book from him/her self"})
        
        if(!requestedBook) return res.status(404).json({Msg: "Book not found"})

        if(requestedBook.bookRequest.filter(book => book.user.toString() === signedInUser._id.toString()).length > 0) return res.status(401).json({Msg: "Can't raquest for a book more than once"})

        if(requestedBook.bookRequest.filter(book => book.user.toString() === signedInUser).length === 0){
            requestedBook.bookRequest.unshift({user: signedInUser})
            await requestedBook.save()
            return res.status(200).json({requestedBook, msg: `${signedInUser.name} has requested for the book titled ${requestedBook.title}`})
        }

        res.status(200).json(requestedBook)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    bookRequest
}