import React, { Fragment, useEffect, useState } from 'react'
import TitleHeader from '../components/component.titleHeader'
import { useDispatch, useSelector } from 'react-redux'
import api from '../services/axios'
import { Container, Table, Button } from 'react-bootstrap'
import ShowImage from '../components/component.showImage'
import QuantityUpdater from '../components/component.quantityUpdater'
import { AiFillDelete } from 'react-icons/ai'
import { removeItem, clearCart, setTotalAmount } from '../features/cartSlice'
import { useNavigate } from 'react-router-dom'
const CartPage = () => {
	const [cartProducts, setCartProducts] = useState([])
	const items = useSelector((state) => state.cart.items)
	const loggedIn = useSelector((state) => state.auth.loggedIn)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	useEffect(() => {
		if (!loggedIn) navigate('/login')
		localStorage.getItem('cart')
			? setCartProducts(JSON.parse(localStorage.getItem('cart')))
			: setCartProducts([])
	}, [items])
	const updateTotalPrice = () => {
		if (cartProducts.length > 0) {
			const pricesArray = []
			cartProducts.forEach((item) => {
				pricesArray.push(parseInt(item.count) * parseInt(item.data.price))
			})
			const sum = pricesArray.reduce((prev, curr) => prev + curr)
			dispatch(setTotalAmount(sum))
			return sum
		}
	}
	return (
		<Fragment>
			<TitleHeader title='Your Cart' description='Manage Your Cart' />
			{cartProducts.length > 0 ? (
				<Container className='mt-3'>
					<h2 className='text-muted'>
						You have {cartProducts.length} items in your cart
					</h2>
					<hr />
					<Container>
						<Table striped hover>
							<thead
								className='text-muted'
								style={{ textAlign: 'center', fontSize: '1.2rem' }}>
								<tr>
									<th>Item</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Total</th>
									<th>Actions</th>
								</tr>
							</thead>
							{cartProducts.map((item, index) => (
								<tbody key={index}>
									<tr className='align-middle'>
										<td>
											<div className='d-flex'>
												<div style={{ width: '72px' }}>
													<ShowImage url='product' item={item} />
												</div>
												<div
													className='d-flex align-items-center'
													style={{ width: 'auto' }}>
													<h3 className='text-muted'>{item.data.name}</h3>
												</div>
											</div>
										</td>
										<td>
											<QuantityUpdater product={item} />
										</td>
										<td>
											<h3 className='text-muted'>₹{item.data.price}</h3>
										</td>
										<td>
											<h3 className='text-muted'>
												₹ {parseInt(item.data.price) * parseInt(item.count)}
											</h3>
										</td>
										<td>
											<h3 className='text-muted d-flex align-items-center justify-content-center'>
												<AiFillDelete
													size={32}
													style={{ color: '#a50100', cursor: 'pointer' }}
													onClick={() => {
														dispatch(removeItem(item._id))
													}}
												/>
											</h3>
										</td>
									</tr>
								</tbody>
							))}
						</Table>
						<Table>
							<thead>
								<tr className=''>
									<th>
										<h3>Total Price</h3>
									</th>
									<th>
										<h3>₹{updateTotalPrice()}</h3>
									</th>
									<th>
										<Button
											className='btn-danger'
											onClick={() => dispatch(clearCart())}>
											Clear Cart
										</Button>
									</th>
									<th>
										<Button
											className='btn-success'
											onClick={() => {
												navigate('/checkout')
											}}>
											Checkout
										</Button>
									</th>
								</tr>
							</thead>
						</Table>
					</Container>
				</Container>
			) : (
				<Container
					className='d-flex align-items-center justify-content-center'
					style={{ height: '60vh' }}>
					<Container className='d-flex justify-content-center'>
						<h1 className='text-muted mx-4'>Your cart is Empty!</h1>
						<Button variant='outline-success' onClick={() => navigate('/shop')}>
							{' '}
							Go To Shop
						</Button>
					</Container>
				</Container>
			)}
		</Fragment>
	)
}

export default CartPage
