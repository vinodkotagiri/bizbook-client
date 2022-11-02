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
			localStorage.setItem('user', JSON.stringify(state.user))
			localStorage.setItem('token', JSON.stringify(state.token))
		},
		logoutUser: (state) => {
			state.user = null
			state.token = null
			state.loggedIn = false
			localStorage.clear()
		},
		updateUser: (state, action) => {
			state.user.name = action.payload
			localStorage.setItem('user', JSON.stringify(state.user))
		},
	},
})
export const { loginUser, logoutUser, updateUser } = authSlice.actions
export default authSlice.reducer
