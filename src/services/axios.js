import axios from 'axios'
export const BASE_URL = 'https://bizbook-server.onrender.com/api'
// 'http://localhost:12000/api'

export default axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
