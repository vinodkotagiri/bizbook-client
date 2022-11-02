import axios from 'axios'
export const BASE_URL = 'http://localhost:12000/api' //'https://bizbook-server.onrender.com/api'

export default axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
