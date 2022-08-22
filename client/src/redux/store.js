import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import userPostReducer from './userPostSlice'
import userCommentReducer from './userCommentSlice'
import bookDetailReducer from './bookDetailSlice'
import likeAndDislikeBookReducer from './likeAndDislikeBookSlice'

export default configureStore({
    reducer:{
        user: userReducer,
        userPost: userPostReducer,
        bookDetail: bookDetailReducer,
        userComment: userCommentReducer,
        likeAndDislikeBook: likeAndDislikeBookReducer,
    }
})