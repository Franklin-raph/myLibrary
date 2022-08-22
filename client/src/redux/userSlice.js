import { createSlice } from '@reduxjs/toolkit'

const signedInUser = localStorage.getItem('signedInuser')
// console.log(signedInUser)

export const userSlice = createSlice({
    name:"user",
    initialState: {value: JSON.parse(signedInUser)},
    reducers:{
        LOGIN:(state, action) => {
            state.value = action.payload
        },
        LOGOUT:(state) => {
            state.value = null
        }
    }
})


export const { LOGIN, LOGOUT } = userSlice.actions
export default userSlice.reducer