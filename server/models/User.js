const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
},{timeStapms: true})

module.exports = mongoose.model('User', UserSchema)