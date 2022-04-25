import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {value: {username: "", token: "", auth: false}},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },

        logout: (state, action) => {
            state.value = {username: "", token: "", auth: false}
        }
    }
})
export const {login, logout} = userSlice.actions

export default userSlice.reducer;