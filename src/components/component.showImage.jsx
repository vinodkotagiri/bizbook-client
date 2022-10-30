import React from 'react'
import { CardImg } from 'react-bootstrap'
import { BASE_URL } from '../services/axios'
const ShowImage = ({ item, url }) => {
	return (
		<CardImg
			src={`${BASE_URL}/${url}/photo/${item._id}`}
			alt='prod-img'
			style={{ height: '18rem' }}
		/>
	)
}

export default ShowImage
