import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const postComment = createAsyncThunk(
    'userComment/createCommentAsync',
    async(payload) => {
        console.log(payload)
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        const response = await fetch(`/api/v1/mylibrary/books/comment/${payload.bookId}`,{
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
            return { data }
        }else{
            console.log(response.statusText)
        }
    }
)



export const getBookDetailComment = createAsyncThunk(
    'userComment/getCommentAsync',
    async(payload) => {
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        console.log(payload)
        const response = await fetch(`/api/v1/mylibrary/books/${payload}`,{
            method: "GET",
            headers : {
                Authorization: `Bearer ${token}`
            }
        });
        if(response.ok){
            const data = await response.json();
            console.log(data)
            return { data }
        }
    }
)


export const userCommentSlice = createSlice({
    name:"userComment",
    initialState: [],
    reducers:{
    },
    extraReducers:{
        [postComment.fulfilled]: (state, action) => {
            console.log(state)
            return action.payload.data;
        },
        [getBookDetailComment.fulfilled]: (state, action) => {
            console.log(action.payload.data)
            return action.payload.data;
        },

        // [likeAndUnlikeBook.fulfilled]: (state, action) => {
        //     const index = state.findIndex(
        //         (data) => data.id === action.payload.id
        //     );
        //     state[index].push(action.payload.data)
        // },
        // [likeAndUnlikeBook.pending]: (state, action) => {
        //     console.log("Fetching data...")
        // },
        // [likeAndUnlikeBook.rejected]: (state, action) => {
        //     console.log("Could not fetch data")
        // }

    }
})

export const { ADDBOOK } = userCommentSlice.actions
export default userCommentSlice.reducer