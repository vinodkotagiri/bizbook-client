import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleHeader from '../components/component.titleHeader'
import DropIn from 'braintree-web-drop-in-react'
import api from '../services/axios'
import {
	Button,
	Col,
	Container,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	Row,
} from 'react-bootstrap'
import Loader from '../components/component.loader'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { clearCart } from '../features/cartSlice'
const CheckoutPage = () => {
	const checkoutTotal = useSelector((state) => state.cart.totalAmount)
	const user = useSelector((state) => state.auth.user)
	const token = useSelector((state) => state.auth.token)
	const [loading, setLoading] = useState(true)
	const [visible, setVisible] = useState(true)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const loggedIn = useSelector((state) => state.auth.loggedIn)
	const [order, setOrder] = useState(null)
	const products = useSelector((state) => state.cart.items)
	const [data, setData] = useState({
		instance: {},
		clientToken: null,
		address: '',
		success: false,
	})
	//set Client Token when page mounts
	const getClientToken = (token, userId) => {
		api
			.get(`/braintree/getToken/${userId}`, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((response) => {
				setData({ ...data, clientToken: response.data.clientToken })
				setLoading(false)
			})
			.catch((error) => console.log(error))
	}
	useEffect(() => {
		if (!loggedIn) navigate('/login')
		if (user && token) getClientToken(token, user._id)
	}, [token, user])
	const createOrder = (orderData, token, user) => {
		if (token && user) {
			api
				.post(
					`/order/create/${user._id}`,
					{ order: orderData },
					{
						headers: { Authorization: 'Bearer ' + token },
					}
				)
				.then((response) => setOrder(response.data))
				.catch((error) => console.log(error))
		}
	}
	const buy = async () => {
		const { nonce } = await data.instance.requestPaymentMethod()
		const amount = checkoutTotal
		api
			.post(
				`/braintree/payment/${user._id}`,
				{
					paymentMethodNonce: nonce,
					amount: amount,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
			.then((response) => {
				setVisible(false)
				setData({ ...data, success: response.data.success })
				toast.success('Thank you! Your payment was successful')
				const orderData = {
					products: products,
					transaction_id: response.data.transaction.id,
					amount: response.data.transaction.amount,
					address: data.address,
				}
				createOrder(orderData, token, user)
				dispatch(clearCart())
				navigate('/cart')
			})
			.catch((err) => console.log(err))
	}

	return (
		<Fragment>
			<TitleHeader title='Checkout' description='Continue to payment' />
			{loading ? (
				<Container className='d-flex'>
					<Loader />
				</Container>
			) : (
				<Container
					className='d-flex flex-column justify-content-center align-items-center'
					style={{ height: '50vh' }}>
					<Row>
						<Col>
							<Form>
								<FormGroup>
									<FormLabel className='text-muted'>Delivery Address</FormLabel>
									<FormControl
										as='textarea'
										style={{ height: '10rem', resize: 'none' }}
										onChange={(e) =>
											setData({ ...data, address: e.target.value })
										}
									/>
								</FormGroup>
							</Form>
						</Col>
						<Col>
							<DropIn
								options={{
									authorization: data.clientToken,
								}}
								onInstance={(instance) => (data.instance = instance)}
							/>
							{visible && (
								<Container className='d-flex justify-content-center gap-3'>
									<Button
										className='btn-secondary'
										onClick={() => navigate('/cart')}
										style={{ width: '5rem' }}>
										Cancel
									</Button>
									<Button
										className='btn-success'
										onClick={buy}
										style={{ width: '5rem' }}>
										Pay
									</Button>
								</Container>
							)}
						</Col>
					</Row>
				</Container>
			)}
		</Fragment>
	)
}

export default CheckoutPage
