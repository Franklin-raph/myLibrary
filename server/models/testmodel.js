const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
    title: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
          user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
],
    bookRequest: [
        {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
],

})

module.exports = mongoose.model('testSchema', TestSchema)