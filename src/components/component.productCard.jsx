import React, { useEffect } from 'react'
import { Button, Card, Col, Container } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import ShowImage from './component.showImage'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../features/cartSlice'
const ProductCard = ({ product, hideProductView = true }) => {
	const truncate = (text, length) => {
		return text.substring(0, length) + '...'
	}
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector((state) => state.auth.user)

	return (
		<Col md={3}>
			<Card
				style={{
					backgroundColor: '#389fbc80',
				}}
				className='my-1 '>
				<ShowImage item={product} url='product' />
				<CardHeader>
					<h6 style={{ fontWeight: 'bold' }}>{product.name}</h6>
				</CardHeader>
				{hideProductView && (
					<>
						<Card.Body>{truncate(product.description, 50)}</Card.Body>
						<Card.Footer>
							<h4 className='px-2 mx-3'>Price: ₹{product.price}</h4>
							<Container className='d-flex justify-content-between align-items-ceter mb-3'>
								<Button
									variant='outline-primary'
									style={{ width: '6rem' }}
									onClick={() => navigate(`/product/${product._id}`)}>
									View
								</Button>
								<Button
									variant='warning'
									style={{ width: '7rem' }}
									onClick={() => {
										if (!user) navigate('/login')
										else dispatch(addItem(product))
									}}>
									Add to Cart
								</Button>
							</Container>
						</Card.Footer>
					</>
				)}
			</Card>
		</Col>
	)
}

export default ProductCard
