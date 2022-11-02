import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/authSlice'
import { Badge } from 'react-bootstrap'
import api from '../services/axios'
import toast from 'react-hot-toast'
import {
	AiOutlineLogin,
	AiOutlineLogout,
	AiOutlineUserAdd,
	AiFillDashboard,
	AiFillHome,
	AiFillShop,
} from 'react-icons/ai'
import { GiShoppingCart } from 'react-icons/gi'
const TopNav = () => {
	const isLoggedIn = useSelector((state) => state.auth.loggedIn)
	const user = useSelector((state) => state.auth.user)
	const cart = useSelector((state) => state.cart.items)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleLogout = async () => {
		await api
			.get('/signout')
			.then((response) => {
				dispatch(logoutUser())
				toast.success('Successfully logged out')
				navigate('/')
			})
			.catch((error) => console.log(error))
	}

	return (
		<>
			<Navbar
				collapseOnSelect
				expand='lg'
				bg='dark'
				variant='dark'
				sticky='top'>
				<Container>
					<Navbar.Brand
						onClick={() => navigate('/')}
						style={{ cursor: 'pointer' }}>
						<img
							src='https://res.cloudinary.com/vinodkotagiri/image/upload/v1666037703/My%20Websites%20assets/portfolio-projects/Bizbook/Bizbook.png'
							alt='logo'
							height={48}
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse
						id='responsive-navbar-nav'
						className='justify-content-end me-5'>
						<Nav>
							<Nav.Link onClick={() => navigate('/')}>
								<AiFillHome />
								&nbsp;Home
							</Nav.Link>
							<Nav.Link onClick={() => navigate('/shop')}>
								<AiFillShop />
								&nbsp;Shop
							</Nav.Link>
						</Nav>
						{!isLoggedIn && (
							<Nav>
								<Nav.Link onClick={() => navigate('/login')}>
									<AiOutlineLogin />
									&nbsp;Login
								</Nav.Link>
								<Nav.Link onClick={() => navigate('/register')}>
									<AiOutlineUserAdd />
									&nbsp;Register
								</Nav.Link>
							</Nav>
						)}
						{isLoggedIn && (
							<Nav>
								<NavDropdown
									className='d-flex align-items-center'
									id='nav-dropdown-dark-example'
									title={`${
										user.name.charAt(0).toUpperCase() +
										user.name.substr(1, user.name.length)
									}`}>
									<NavDropdown.Item
										onClick={() => navigate('/dashboard')}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '1rem',
										}}>
										<AiFillDashboard size={24} />
										Dashboard
									</NavDropdown.Item>
									<Dropdown.Divider />
									<NavDropdown.Item
										onClick={handleLogout}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '1rem',
										}}>
										<AiOutlineLogout size={24} />
										Logout
									</NavDropdown.Item>
								</NavDropdown>
								<Nav>
									<Nav.Link onClick={() => navigate('/cart')}>
										<GiShoppingCart size={36} />
										<sup>
											<Badge bg='danger'>{cart.length}</Badge>
										</sup>
									</Nav.Link>
								</Nav>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Outlet />
		</>
	)
}

export default TopNav
