import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import TitleHeader from '../components/component.titleHeader'
import api from '../services/axios'
import { updateUser } from '../features/authSlice'
import toast from 'react-hot-toast'
import {
	Button,
	Container,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
} from 'react-bootstrap'
const ProfileUpdatePage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [user, setUser] = useState({
		name: '',
		email: '',
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	})
	const params = useParams()
	const token = useSelector((state) => state.auth.token)
	const getUser = (id) => {
		api
			.get(`/user/${id}`, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((response) => {
				setUser({
					...user,
					name: response.data.name,
					email: response.data.email,
				})
				dispatch(updateUser(response.data.name))
			})
			.catch((error) => console.log(error))
	}
	useEffect(() => {
		if (token) {
			getUser(params.userId)
		}
	}, [token])
	const handleUpdate = () => {
		if (user.newPassword !== user.confirmPassword)
			return toast.error('Passwords dont match')
		api
			.put(
				`/user/${params.userId}`,
				{
					name: user.name,
					oldPassword: user.oldPassword,
					newPassword: user.newPassword,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
			.then((response) => {
				toast.success('User update successful')
				getUser(response.data.user._id)
				navigate('/dashboard')
			})
			.catch((error) => {
				toast.error(error.response.data)
				console.log(error.response.data)
			})
	}
	return (
		<Fragment>
			<TitleHeader title='Vinod' description='Update Profile' />
			<Container className='d-flex justify-content-center align-items-center'>
				<Form style={{ width: '50%' }}>
					<FormGroup className='my-3'>
						<FormLabel className='text-muted'>
							<h4>Name</h4>
						</FormLabel>
						<FormControl
							value={user?.name}
							onChange={(e) => setUser({ ...user, name: e.target.value })}
						/>
					</FormGroup>
					<FormGroup className='my-3'>
						<FormLabel className='text-muted'>
							<h4>Email</h4>
						</FormLabel>
						<FormControl value={user?.email} disabled />
					</FormGroup>
					<FormGroup className='my-3'>
						<FormLabel className='text-muted'>
							<h4>Current Password</h4>
						</FormLabel>
						<FormControl
							value={user?.oldPassword}
							type='password'
							onChange={(e) =>
								setUser({ ...user, oldPassword: e.target.value })
							}
						/>
					</FormGroup>
					<FormGroup className='my-3'>
						<FormLabel className='text-muted'>
							<h4>New Password</h4>
						</FormLabel>
						<FormControl
							value={user?.newPassword}
							type='password'
							onChange={(e) =>
								setUser({ ...user, newPassword: e.target.value })
							}
						/>
					</FormGroup>
					<FormGroup className='my-3'>
						<FormLabel className='text-muted'>
							<h4>Confirm Password</h4>
						</FormLabel>
						<FormControl
							value={user?.confirmPassword}
							type='password'
							onChange={(e) =>
								setUser({ ...user, confirmPassword: e.target.value })
							}
						/>
					</FormGroup>
					<Button onClick={handleUpdate}>Update</Button>
				</Form>
			</Container>
		</Fragment>
	)
}

export default ProfileUpdatePage
