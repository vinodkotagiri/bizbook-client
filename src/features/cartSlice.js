import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	items: [],
	isEmpty: true,
	totalAmount: 0,
}
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const { _id, ...data } = action.payload
			// console.log(_id)
			//If cart is Empty
			const { price } = data
			const total = parseInt(price)
			if (state.isEmpty) {
				state.items.push({ _id, data, count: 1 })
				state.isEmpty = false
				localStorage.setItem('cart', JSON.stringify(state.items))
				return
			}
			//check iF duplicate items added
			let itemIndex = null
			state.items.forEach((item, index) => {
				if (item._id === _id) itemIndex = index
			})
			if (itemIndex !== null) {
				state.items[itemIndex].count++
				localStorage.setItem('cart', JSON.stringify(state.items))
			} else {
				state.items.push({ _id, data, count: 1 })
				localStorage.setItem('cart', JSON.stringify(state.items))
			}
		},
		removeItem: (state, action) => {
			const _id = action.payload
			state.items = state.items.filter((item) => item._id !== _id)
			if (state.items.length === 0) localStorage.removeItem('cart')
			else localStorage.setItem('cart', JSON.stringify(state.items))
		},
		increaseQty: (state, action) => {
			const _id = action.payload
			let itemIndex = null
			state.items.forEach((item, index) => {
				if (item._id === _id) itemIndex = index
			})
			if (itemIndex !== null) {
				state.items[itemIndex].count++
				localStorage.setItem('cart', JSON.stringify(state.items))
			}
		},
		decreaseQty: (state, action) => {
			const _id = action.payload
			let itemIndex = null
			state.items.forEach((item, index) => {
				if (item._id === _id) itemIndex = index
			})
			if (itemIndex !== null) {
				if (state.items[itemIndex].count > 1) state.items[itemIndex].count--
				localStorage.setItem('cart', JSON.stringify(state.items))
			}
		},
		clearCart: (state, action) => {
			state.items = []
			state.isEmpty = true
			localStorage.removeItem('cart')
		},
		setTotalAmount: (state, action) => {
			state.totalAmount = action.payload
		},
	},
})
export const {
	addItem,
	removeItem,
	increaseQty,
	decreaseQty,
	clearCart,
	setTotalAmount,
} = cartSlice.actions
export default cartSlice.reducer
