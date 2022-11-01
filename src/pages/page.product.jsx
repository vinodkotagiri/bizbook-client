import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/axios'
import ProductCard from '../components/component.productCard'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { addItem } from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProductPage = () => {
	const [product, setProduct] = useState(null)
	const [relatedProducts, setRelatedProducts] = useState([])
	const { productId } = useParams()
	const user = useSelector((state) => state.auth.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	//Load product data on page load
	useEffect(() => {
		//Get product data
		;(() => {
			api
				.get(`/product/${productId}`)
				.then((response) => setProduct(response.data))
				.catch((error) => console.log(error))
		})()
		//Get Related Products data
		;(() => {
			api
				.get(`/products/related/${productId}`)
				.then((response) => setRelatedProducts(response.data))
				.catch((error) => console.log(error))
		})()
	}, [productId])

	return (
		<Fragment>
			<Container
				className='d-flex align-items-center justify-content-center'
				style={{ height: '100vh' }}>
				<div>
					<Row className='align-items-center'>
						{product && (
							<ProductCard product={product} hideProductView={false} />
						)}
						<Col className='mx-5'>
							<h1 className=' text-muted'>Title: {product?.name}</h1>
							<h3 className='lead text-muted'>
								Description:
								<br />
								{product?.description}
							</h3>
							<hr />
							<Row>
								<Col>
									<h4 className=' text-muted mt-4'>
										Category: {product?.category.name.toUpperCase()}
									</h4>
									<h4 className=' text-muted mt-3'>Price: ₹{product?.price}</h4>
									<h4 className=' text-muted mt-3'>
										Added: {moment(product?.createdAt).fromNow()}
									</h4>
									<h4 className=' text-muted mt-3'>
										Availability:{' '}
										{product?.quantity > 0 ? 'In Stock' : 'Out of Stock'}
									</h4>
									<h4 className=' text-muted mt-3'>
										Shipping:{' '}
										{product?.shipping === 0
											? 'Not Deliverable'
											: 'Deliverable'}
									</h4>
								</Col>
								<Col className='d-flex justify-content-center align-items-center'>
									<div>
										<Button
											className='my-2'
											variant='outline-primary'
											style={{ width: '18rem', height: '5rem' }}
											onClick={() => {
												if (!user) navigate('/login')
												else dispatch(addItem(product))
											}}>
											Add to Cart
										</Button>
										<Button
											className='my-2'
											variant='warning'
											style={{
												width: '18rem',
												height: '5rem',
												fontWeight: 'bold',
											}}>
											Buy Now
										</Button>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			</Container>
			<hr />
			<Container fluid className='my-3'>
				<h1 className=' text-muted mb-3'>Related Products</h1>
				<Row>
					{relatedProducts &&
						relatedProducts.map((r, index) => (
							<ProductCard key={index} product={r} />
						))}
				</Row>
			</Container>
		</Fragment>
	)
}

export default ProductPage
