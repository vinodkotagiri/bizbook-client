import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/authSlice'
import api from '../services/axios'
import toast from 'react-hot-toast'
import {
	AiOutlineLogin,
	AiOutlineLogout,
	AiOutlineUserAdd,
	AiFillDashboard,
} from 'react-icons/ai'
const TopNav = () => {
	const isLoggedIn = useSelector((state) => state.auth.loggedIn)
	const user = useSelector((state) => state.auth.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleLogout = async () => {
		await api
			.get('/signout')
			.then((response) => {
				dispatch(logoutUser())
				localStorage.removeItem('auth')
				toast.success('Successfully logged out')
				navigate('/')
			})
			.catch((error) => console.log(error))
	}

	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
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
							<NavDropdown id='nav-dropdown-dark-example' title={user.name}>
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
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default TopNav
