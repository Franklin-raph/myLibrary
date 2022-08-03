const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    tags :[String],
    likes: [
        {
          user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
],
    comments: [
        {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        name:{
            type:String,
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
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