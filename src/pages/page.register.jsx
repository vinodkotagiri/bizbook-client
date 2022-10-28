import React, { Fragment } from 'react'
import TitleHeader from '../components/component.titleHeader'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import api from '../services/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/component.loader'
const RegisterPage = () => {
	const [valid, setValid] = useState(false)
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false,
	})
	const navigate = useNavigate()
	useEffect(() => {
		return localStorage.getItem('auth') ? navigate('/') : () => null
	}, [])
	useEffect(() => {
		if (
			values.name !== '' &&
			values.email !== '' &&
			values.password !== '' &&
			values.password.length > 6
		)
			setValid(true)
		else {
			setValid(false)
		}
	}, [values])

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value })
	}

	const handleRegister = (e) => {
		e.preventDefault()
		signup(values.name, values.email, values.password)
	}
	const signup = async (name, email, password) => {
		setLoading(true)
		await api
			.post('/signup', {
				name: name.toLowerCase(),
				email: email.toLowerCase(),
				password: password,
			})
			.then((response) => {
				console.log(response.data)
				setTimeout(() => {
					toast.success('Registration successful')
					navigate('/login')
					setLoading(false)
				}, 3500)
			})
			.catch((error) => {
				console.log(error.response.data)
				setTimeout(() => {
					setLoading(false)
					toast.error(error.response.data)
				}, 3500)
			})
	}
	return (
		<Fragment>
			<TitleHeader
				title='Register'
				description='Register for new BizBook.io account'
			/>
			{!loading ? (
				<Container
					style={{ padding: '2rem 0', maxWidth: '22.5rem', width: '22.5rem' }}>
					<Form>
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label className='text-muted'>
								<span className='text-danger'>*</span>Name
							</Form.Label>
							<Form.Control
								type='text'
								name='name'
								onChange={handleChange('name')}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label className='text-muted'>
								<span className='text-danger'>*</span>Email
							</Form.Label>
							<Form.Control
								type='email'
								name='email'
								onChange={handleChange('email')}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formBasicPassword'>
							<Form.Label className='text-muted'>
								{' '}
								<span className='text-danger'>*</span>Password
							</Form.Label>
							<Form.Control
								type='password'
								name='password'
								onChange={handleChange('password')}
							/>
						</Form.Group>
						<Button
							variant='primary'
							onClick={handleRegister}
							disabled={!valid}>
							Register
						</Button>
					</Form>
				</Container>
			) : (
				<Loader />
			)}
		</Fragment>
	)
}

export default RegisterPage
