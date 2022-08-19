import { createSlice } from '@reduxjs/toolkit'

const signedInUserProfile = localStorage.getItem('signedInuserProfile')
console.log(signedInUserProfile)

export const userProfileSlice = createSlice({
    name:"userProfile",
    initialState: [{value: JSON.parse(signedInUserProfile)}],
    reducers:{
        VIEWPROFILE:(state, action) => {
            state = action.payload
        }
    }
})

export const { VIEWPROFILE } = userProfileSlice.actions
export default userProfileSlice.reducer