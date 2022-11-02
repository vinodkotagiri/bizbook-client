import React, { Fragment, useEffect, useRef } from 'react'
import TitleHeader from '../components/component.titleHeader'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import { BsPlusCircleFill } from 'react-icons/bs'
import { useState } from 'react'
import api from '../services/axios'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
const initialProductState = {
	name: '',
	description: '',
	price: '',
	category: '',
	photo: '',
	shipping: '',
	quantity: '',
	formData: new FormData(),
}
const CreateProductPage = () => {
	const [valid, setValid] = useState(false)
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(false)
	const isLoggedIn = useSelector((state) => state.auth.loggedIn)
	const user = useSelector((state) => state.auth.user)
	const token = useSelector((state) => state.auth.token)
	const [values, setValues] = useState(initialProductState)
	const { name, price, category, photo, shipping, quantity, formData } = values
	const navigate = useNavigate()
	const getCategories = async () => {
		await api
			.get('/categories')
			.then((response) => setCategories(response.data))
			.catch((error) => console.log(error))
	}
	useEffect(() => {
		if (
			name !== '' &&
			name.length >= 3 &&
			price !== '' &&
			category !== '-1' &&
			photo !== '' &&
			shipping !== '-1' &&
			quantity !== ''
		)
			setValid(true)
		else setValid(false)
	}, [values])
	useEffect(() => {
		if (!isLoggedIn) navigate('/login')
		if (user?.role !== 1) navigate('/')
		getCategories()
	}, [])

	const handleChange = (event) => {
		const name = event.target.name
		const val = name === 'photo' ? event.target.files[0] : event.target.value
		formData.set(name, val)
		setValues({ ...values, [name]: val })
	}
	console.log(formData)
	const handleSubmit = async () => {
		setLoading(true)
		await api
			.post(`/product/create/${user._id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response.data)
				toast.success('Product Added Successfully')
				setLoading(false)
			})
			.catch((error) => {
				console.log(error.response.data)
				toast.error(error.response.data)
				setLoading(false)
			})
	}
	return (
		<Fragment>
			<TitleHeader title='Create Product' description='Add a product' />
			<Container className='mt-5'>
				<Form>
					<Row>
						<Col>
							<Form.Group className='mb-3' controlId='formBasicPhoto'>
								<Form.Label className='text-muted'>
									<span className='text-danger'>*</span>Photo
								</Form.Label>
								<Form.Control
									type='file'
									name='photo'
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formBasicName'>
								<Form.Label className='text-muted'>
									<span className='text-danger'>*</span>Name
								</Form.Label>
								<Form.Control type='text' name='name' onChange={handleChange} />
							</Form.Group>
							<Form.Group className='mb-3' controlId='formBasicName'>
								<Form.Label className='text-muted'>
									<span className='text-danger'>*</span>Description
								</Form.Label>
								<Form.Control
									as='textarea'
									name='description'
									style={{ resize: 'none', height: 124 }}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3' controlId='formBasicName'>
								<Form.Label className='text-muted'>
									<span className='text-danger'>*</span>Category
								</Form.Label>
								<Form.Select
									aria-label='category'
									name='category'
									onChange={handleChange}>
									<option value='-1' default>
										Select a category
									</option>
									{categories.map((category) => (
										<option value={category._id} key={category._id}>
											{category.name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formBasicName'>
								<Form.Label className='text-muted'>
									<span className='text-danger'>*</span>Price
								</Form.Label>
								<Form.Control
									type='number'
									min={0}
									name='price'
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formBasicName'>
								<Form.Label className='text-muted'>
									<span className='text-danger'>*</span>Quantity
								</Form.Label>
								<Form.Control
									type='number'
									name='quantity'
									min={1}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formBasicName'>
								<Form.Label className='text-muted'>
									<span className='text-danger'>*</span>Shipping
								</Form.Label>
								<Form.Select
									aria-label='shipping'
									name='shipping'
									onChange={handleChange}>
									<option value='-1' default>
										Select Shipping
									</option>
									<option value='0'>No</option>
									<option value='1'>Yes</option>
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Row
						style={{
							display: 'flex',
							width: '100%',
							justifyContent: 'center',
						}}>
						<Button
							variant='primary'
							onClick={handleSubmit}
							disabled={!valid}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.2rem',
								justifyContent: 'center',
								width: '20%',
							}}>
							<BsPlusCircleFill size={16} />
							Add
							{loading && (
								<Spinner animation='border' role='status' size='sm' />
							)}
						</Button>
					</Row>
				</Form>
			</Container>
		</Fragment>
	)
}

export default CreateProductPage
