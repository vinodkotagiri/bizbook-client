import React, { Fragment, useEffect } from 'react'
import TitleHeader from '../components/component.titleHeader'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUserEdit } from 'react-icons/fa'
import { Table } from 'react-bootstrap'
const UserDashboard = () => {
	const user = useSelector((state) => state.auth.user)
	const isLoggedIn = useSelector((state) => state.auth.loggedIn)
	const navigate = useNavigate()
	useEffect(() => {
		if (!isLoggedIn) navigate('/login')
	}, [user])
	console.log(user.history)
	return (
		<Fragment>
			<TitleHeader title='Dashboard' description='user dashboard' />
			<Row>
				<Col md={4}>
					<Container className='nav-pane mt-3'>
						<Card className='mt-3'>
							<Card.Header>
								<h3>Actions</h3>
							</Card.Header>
							<ListGroup variant='flush'>
								<ListGroup.Item
									style={{ cursor: 'pointer' }}
									onClick={() => navigate('/')}>
									<FaShoppingCart size={25} />
									&emsp;My Cart
								</ListGroup.Item>
								<ListGroup.Item
									style={{ cursor: 'pointer' }}
									onClick={() => navigate(`/update/${user._id}`)}>
									<FaUserEdit size={25} />
									&emsp;Update Profile
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Container>
				</Col>
				<Col>
					<Container className='details-pane mt-3'>
						<Card className='mt-3'>
							<Card.Header>
								<h3>User Information</h3>
							</Card.Header>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<span className='text-muted'>Name</span>&nbsp;:&emsp;
									{user?.name}
								</ListGroup.Item>
								<ListGroup.Item>
									<span className='text-muted'>Email</span>&nbsp;:&emsp;
									{user?.email}
								</ListGroup.Item>
								<ListGroup.Item>
									<span className='text-muted'>Role</span>&nbsp;:&emsp;
									{user?.role === 1 ? 'Admin' : 'Registered User'}
								</ListGroup.Item>
							</ListGroup>
						</Card>
						<Card className='mt-3'>
							<Card.Header>
								<h3>Purchase History</h3>
							</Card.Header>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									{user?.history?.length > 0 ? (
										<Container>
											{user?.history.map((prod, index) =>
												prod.map((p, i) => (
													<Table>
														<thead>
															<th>#</th>
															<th>Order ID</th>
															<th>Transaction ID</th>
															<th>Quantity</th>
														</thead>
														<tbody>
															<tr>
																<td>{i + 1}</td>
																<td className='text-muted'>
																	<Link to={`/product/${p._id}`}>{p._id}</Link>
																</td>
																<td className='text-muted'>
																	{p.transaction_id}
																</td>
																<td className='text-muted'>{p.quantity}</td>
															</tr>
														</tbody>
													</Table>
												))
											)}
										</Container>
									) : (
										'No Purchases'
									)}
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Container>
				</Col>
			</Row>
		</Fragment>
	)
}

export default UserDashboard
