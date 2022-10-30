import React from 'react'
import { Button, Card, Col, Container } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import ShowImage from './component.showImage'
const ProductCard = ({ product }) => {
	const truncate = (text, length) => {
		return text.substring(0, length) + '...'
	}
	return (
		<Col md={3}>
			<Card
				style={{
					width: '18rem',
					backgroundColor: '#389fbc80',
				}}
				className='my-1 '>
				<CardHeader>
					<h3>{product.name}</h3>
				</CardHeader>
				<ShowImage item={product} url='product' />
				<Card.Body>{truncate(product.description, 50)}</Card.Body>
				<Card.Footer>
					<h4 className='text-muted px-2 my-2'>₹{product.price}</h4>
					<Container className='d-flex justify-content-between align-items-ceter mb-3'>
						<Button variant='outline-primary' style={{ width: '6rem' }}>
							View
						</Button>
						<Button variant='warning' style={{ width: '8rem' }}>
							Add to Cart
						</Button>
					</Container>
				</Card.Footer>
			</Card>
		</Col>
	)
}

export default ProductCard
