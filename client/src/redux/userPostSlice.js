import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getMyBooks = createAsyncThunk(
    'userPost/getUserPostAsync',
    async() => {
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        const response = await fetch('/api/v1/mylibrary/user/mybooks',{
            method: "GET",
            headers : {
                Authorization: `Bearer ${token}`
            }
        });
        if(response.ok){
            const data = await response.json();
            return { data }
        }
    }
)


export const addBook = createAsyncThunk(
    'userPost/addBookAsync',
    async(payload) => {
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        const response = await fetch('/api/v1/mylibrary/books/postbook',{
            method: "POST",
            headers : {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: payload.title,
                                  author: payload.author,
                                  publishedDate: payload.publishedDate,
                                  description: payload.description,
                                  bookGenre: payload.bookGenre,
                                  tags: payload.tags
                                })
        });
        if(response.ok){
            const data = await response.json();
            return { data }
        }
    }
)


export const likeAndUnlikeBook = createAsyncThunk(
//     'userPost/likeAndUnllikeBookAsync',
//     async(payload) => {
//         const signedInUser = localStorage.getItem('signedInuser')
//         const userToken = JSON.parse(signedInUser)
//         const { token } = userToken
//         const response = await fetch(`/api/v1/mylibrary/books/likebook/${payload.id}`,{
//             method:"PATCH",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 id:payload.id, likes: payload.data
//             })
//         })
//         console.log(response)
//     }
)


export const userPostSlice = createSlice({
    name:"userPost",
    initialState: [],
    reducers:{
    },
    extraReducers:{
        [getMyBooks.pending]: (state, action) => {
            console.log("Fetching data...")
        },
        [getMyBooks.fulfilled]: (state, action) => {
            return action.payload.data;
        },
        [getMyBooks.rejected]: (state, action) => {
            console.log("Could not fetch data")
        },
        [addBook.pending]: (state, action) => {
            console.log("Sending data")
        },
        [addBook.fulfilled]: (state, action) => {
            state.push(action.payload.data)
        },
        [addBook.rejected]: (state, action) => {
            console.log("Could not fetch data")
        }

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

export const { ADDBOOK } = userPostSlice.actions
export default userPostSlice.reducer