import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getMyBooks = createAsyncThunk(
    'userPost/getUserPostAsync',
    async() => {
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        const response = await fetch('https://bookshareserver.herokuapp.com/api/v1/mylibrary/user/mybooks',{
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
// http://localhost:8000/api/v1/mylibrary/books/comment/630167cda34eae92fb76b901

export const addBook = createAsyncThunk(
    'userPost/addBookAsync',
    async(payload) => {
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        const response = await fetch('https://bookshareserver.herokuapp.com/api/v1/mylibrary/books/postbook',{
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
            console.log(Array.isArray(data))
            return { data }
        }
    }
)


export const deleteMyBook = createAsyncThunk(
    'userPost/deleteBookAsync',
    async(payload) => {
        console.log(payload)
        const signedInUser = localStorage.getItem('signedInuser')
        const userToken = JSON.parse(signedInUser)
        const { token } = userToken
        const response = await fetch('https://bookshareserver.herokuapp.com/api/v1/mylibrary/books/deletebook/'+payload,{
            method: "DELETE",
            headers : {
                Authorization: `Bearer ${token}`
            }
        });
        if(response.ok){
            const data = await response.json();
            return { data }
        }else{
            const errorMessage = await response.json();
            return { errorMessage }
            // console.log(errorMessage)
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
            console.log(state.userPost)
            return action.payload.data;
        },
        [getMyBooks.rejected]: (state, action) => {
            console.log("Could not fetch data")
        },
        [addBook.pending]: (state, action) => {
            console.log("Sending data")
        },
        [addBook.fulfilled]: (state, action) => {
            console.log(action.payload.data)
            state.push(action.payload.data)
        },
        [addBook.rejected]: (state, action) => {
            console.log("Could not fetch data")
        },
        [deleteMyBook.pending]: (state, action) => {
            console.log("Pending")
            // state.filter(book => book._id !== action.meta.arg)
        },
        [deleteMyBook.fulfilled]: (state, action) => {
            const d = state.filter(book => book._id !== action.payload.data)
            console.log(action.payload)
        },
        [deleteMyBook.rejected]: (state, action) => {
            // state.userPost = state.userPost.filter(book => book._id !==
            //     action.payload.id)
            console.log("Rejected")
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

// export const { deleteMyBook } = userPostSlice.actions
export default userPostSlice.reducer