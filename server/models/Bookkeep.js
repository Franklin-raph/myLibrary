const mongoose = require('mongoose')
const userSchema = require('./user')

const BookKeepingSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    auhtor: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bookGenre: {
        type: String,
        required: true
    },
    bookCoverPhoto: {
        type: String
    },
    likes: [
        {
          user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }
],
    followers: [
            {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
          user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
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
    tags: {
        type: [String],
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Bookkeep', BookKeepingSchema)