const mongoose = require('mongoose')

const BookKeepingSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName:{
        type: String
    },
    avatar:{
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    author: {
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
            ref: 'User'
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
    tags: {
        type: [String],
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Bookkeep', BookKeepingSchema)