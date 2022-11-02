import React, { Fragment, useEffect } from 'react'
import TitleHeader from '../components/component.titleHeader'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	MdCategory,
	MdOutlineAddCircle,
	MdOutlineVisibility,
} from 'react-icons/md'
import { BsShop } from 'react-icons/bs'
const AdminDashboard = () => {
	const user = useSelector((state) => state.auth.user)
	const isLoggedIn = useSelector((state) => state.auth.loggedIn)
	const navigate = useNavigate()
	useEffect(() => {
		console.log(isLoggedIn)
		if (!isLoggedIn) navigate('/login')
	}, [])

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
									onClick={() => navigate(`/${user._id}/create-category`)}>
									<MdCategory size={25} />
									&emsp;Add Category
								</ListGroup.Item>
								<ListGroup.Item
									style={{ cursor: 'pointer' }}
									onClick={() => navigate(`/${user._id}/create-product`)}>
									<MdOutlineAddCircle size={25} />
									&emsp;Add Product
								</ListGroup.Item>
								<ListGroup.Item
									style={{ cursor: 'pointer' }}
									onClick={() => navigate(`/${user._id}/products`)}>
									<BsShop size={25} />
									&emsp;All Products
								</ListGroup.Item>
								<ListGroup.Item
									style={{ cursor: 'pointer' }}
									onClick={() => navigate(`/${user._id}/orders`)}>
									<MdOutlineVisibility size={25} />
									&emsp;View Orders
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
									{user?.history === [] ? user?.history : 'No Purchases'}
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Container>
				</Col>
			</Row>
		</Fragment>
	)
}

export default AdminDashboard
