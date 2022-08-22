import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getBookDetail = createAsyncThunk(
    'bookDetail/getBookDetailAsync',
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


export const bookDetailSlice = createSlice({
    name:"bookDetail",
    initialState: [],
    reducers:{
    },
    extraReducers:{
        [getBookDetail.fulfilled]: (state, action) => {
            // console.log(action.payload.data)
            return action.payload.data;
        },
    }
})

export default bookDetailSlice.reducer