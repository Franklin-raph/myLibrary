import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import userPostReducer from './userPostSlice'
import userCommentSlice from './userCommentSlice'

export default configureStore({
    reducer:{
        user: userReducer,
        userPost: userPostReducer,
        userComment: userCommentSlice,
    }
})