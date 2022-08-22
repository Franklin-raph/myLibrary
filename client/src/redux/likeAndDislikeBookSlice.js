import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const likeAndDislikeBook = createAsyncThunk(
    'book/likeAndDislikeBookAsync',
    async(payload) => {
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken

        const response = await fetch(`/api/v1/mylibrary/books/likebook/${payload}`,{
            method: "PATCH",
            headers :{
                Authorization: `Bearer ${token}`
            }
        });
        if(response.ok){
            const data = await response.json();
            // const bookLikes = data.postedBookData.likes
            console.log(data)
            return { data }
        }else{
            console.log(response.statusText)
        }
    }
)


export const likeAndDislikeBookSlice = createSlice({
    name:"likeAndDislikeBook",
    initialState: [],
    reducers:{
    },
    extraReducers:{
        [likeAndDislikeBook.pending]: (state, action) => {
            // console.log(Array.isArray(state))
        },
        [likeAndDislikeBook.fulfilled]: (state, action) => {
            // state.push(action.payload)
            console.log(action.payload.data)
            return (action.payload.data)
        },
    }
})

export default likeAndDislikeBookSlice.reducer