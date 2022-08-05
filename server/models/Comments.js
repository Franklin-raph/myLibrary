// const mongoose = require('mongoose')

// const CommentSchema = mongoose.Schema({
//     user:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'users'
//     },
//     book:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'bookkeeps'
//     },
//     text: {
//         type: String,
//         required: true
//     },
//     likes: [
//         {
//           user:{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         }
//     }
// ]
// },{timestamps: true})

// module.exports = mongoose.model('commentSchema', CommentSchema)