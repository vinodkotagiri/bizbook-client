import React, { Fragment, useEffect, useState } from 'react'
import {
	Container,
	Form,
	FormControl,
	FormGroup,
	FormSelect,
	Table,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../services/axios'
import TitleHeader from '../components/component.titleHeader'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { AiFillEye } from 'react-icons/ai'
const OrdersPage = () => {
	const [orders, setOrders] = useState([])
	const token = useSelector((state) => state.auth.token)
	const user = useSelector((state) => state.auth.user)
	const [open, setOpen] = useState(false)
	const [currentProducts, setCurrentProducts] = useState([])
	const [statusValues, setStatusValues] = useState([])
	const getOrders = () => {
		api
			.get(`/order/list/${user._id}`, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((response) => setOrders(response.data))
			.catch((err) => console.log(err))
	}
	useEffect(() => {
		if (user && token) {
			getOrders()
			getStatusValues(user, token)
		}
	}, [user, token])
	const getStatusValues = (user, token) => {
		api
			.get(`/order/status-values/${user._id}`, {
				headers: { Authorization: 'Bearer ' + token },
			})
			.then((response) => setStatusValues(response.data))
			.catch((error) => console.log(error))
	}
	const updateOrderStatus = (orderId, status) => {
		api
			.put(
				`/order/${orderId}/status/${user._id}`,
				{ status, orderId },
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
			.then((response) => getOrders())
			.catch((err) => console.log(err))
	}
	const handleStatusChange = (e, order) => {
		const status = e.target.value
		console.log(e.target.value, order._id)
		updateOrderStatus(order._id, status)
	}
	return (
		<Fragment>
			<TitleHeader title='Orders' />
			{orders.length < 1 ? (
				<Container
					className='d-flex justify-content-center align-items-center'
					style={{ height: '50vh' }}>
					<h1 className='text-muted'>😞No Orders</h1>
				</Container>
			) : (
				<>
					<h1 className='text-center text-muted'>
						Total Orders: {orders.length}
					</h1>
					<hr />

					<Table striped bordered hover className='container'>
						<thead className='text-center'>
							<th>Order ID</th>
							<th>Order Status</th>
							<th>Transaction ID</th>
							<th>Amount</th>
							<th>Ordered By</th>
							<th>Placed</th>
							<th>Delivery Address</th>
							<th>Products Deatails</th>
							<th>Action</th>
						</thead>
						<tbody>
							{orders?.map((order, index) => (
								<tr>
									<td>{order._id}</td>
									<td>{order.status}</td>

									<td>{order.transaction_id}</td>
									<td>₹{order.amount}</td>
									<td>{order.user.name}</td>
									<td>{moment(order.createdAt).fromNow()}</td>
									<td>{order.address}</td>
									<td
										onClick={() => {
											setOpen(true)
											setCurrentProducts(order.products)
										}}
										style={{ cursor: 'pointer' }}>
										View Products
									</td>
									<td>
										<Form>
											<FormGroup>
												<FormSelect
													onChange={(e) => handleStatusChange(e, order)}>
													<option value=''>update Status</option>
													{statusValues.map((status, index) => (
														<option key={index} value={status}>
															{status}
														</option>
													))}
												</FormSelect>
											</FormGroup>
										</Form>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}

			<Modal
				show={open}
				onHide={() => setOpen(false)}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>Products</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table bordered striped hover>
						<thead className='text-center'>
							<th>Product ID</th>
							<th>Quantity</th>
							<th>Action</th>
						</thead>
						{currentProducts.map((product, index) => (
							<tbody key={index}>
								<tr>
									<td>
										<small>{product._id}</small>
									</td>
									<td className='text-center'>{product.count}</td>
									<td className='text-center' style={{ cursor: 'pointer' }}>
										<Link
											style={{ textDecoration: 'none' }}
											to={`/product/${product._id}`}>
											<AiFillEye size={24} />
										</Link>
									</td>
								</tr>
							</tbody>
						))}
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setOpen(false)}>Close</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	)
}

export default OrdersPage
