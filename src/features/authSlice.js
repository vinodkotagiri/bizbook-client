import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	user: null,
	token: null,
	loggedIn: false,
}
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.token
			state.loggedIn = true
		},
		logoutUser: (state) => {
			state.user = null
			state.token = null
			state.loggedIn = false
		},
	},
})
export const { loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer
