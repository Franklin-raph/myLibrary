import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllCommentsForABook = createAsyncThunk(
    'userComment/getCommentAsync',
    async(payload) => {
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        // console.log(payload)
        const response = await fetch(`https://bookshareserver.herokuapp.com/api/v1/mylibrary/books/bookcomments/${payload}`,{
            method: "GET",
            headers : {
                Authorization: `Bearer ${token}`
            }
        });
        if(response.ok){
            const data = await response.json();
            // console.log(Array.isArray(data))
            return { data }
        }
    }
)


export const postComment = createAsyncThunk(
    'userComment/createCommentAsync',
    async(payload) => {
        console.log(payload)
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        const response = await fetch(`https://bookshareserver.herokuapp.com/api/v1/mylibrary/books/comment/${payload.bookId}`,{
            method:"PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: payload.text,
                user: payload.name
            })
        })
        if(response.ok){
            const data = await response.json();
            console.log(Array.isArray(data))
            return { data }
        }else{
            console.log(response.statusText)
        }
    }
)


export const userCommentSlice = createSlice({
    name:"userComment",
    initialState: [],
    reducers:{
    },
    extraReducers:{
        [postComment.pending]: (state, action) => {
            // console.log(Array.isArray(state))
        },
        [postComment.fulfilled]: (state, action) => {
            // Object.entries(state.userComment)
            state.push(action.payload)
            // console.log(Array.isArray(state))
        },
        [getAllCommentsForABook.fulfilled]: (state, action) => {
            // console.log(action.payload.data)
            return (action.payload.data)
        }
    }
})

export default userCommentSlice.reducer