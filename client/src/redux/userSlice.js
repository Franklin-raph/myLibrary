import { createSlice } from '@reduxjs/toolkit'

const signedInUser = localStorage.getItem('signedInUser')

export const userSlice = createSlice({
    name:"user",
    initialState: {value: JSON.parse(signedInUser)},
    reducers:{
        LOGIN:(state, action) => {
            state.value = action.payload
        },
        SIGNUP:(state, action) => {
            state.value = action.payload
        }
    }
})

export const { LOGIN, SIGNUP } = userSlice.actions
export default userSlice.reducer