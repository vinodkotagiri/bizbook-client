import React, { Fragment, useEffect } from 'react'
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
const CreateCategoryPage = () => {
	const [valid, setValid] = useState(false)
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const isLoggedIn = useSelector((state) => state.auth.loggedIn)
	const user = useSelector((state) => state.auth.user)
	const token = useSelector((state) => state.auth.token)
	const navigate = useNavigate()
	useEffect(() => {
		if (name !== '' && name.length >= 3) setValid(true)
		else setValid(false)
	}, [name])
	useEffect(() => {
		if (!isLoggedIn) navigate('/login')
		if (user?.role !== 1) navigate('/')
	})
	const handleAddCategory = async () => {
		setLoading(true)
		await api
			.post(
				`/category/create/${user._id}`,
				{ name: name.toLowerCase() },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((response) => {
				console.log(response.data)
				toast.success('Category Added Successfully')
				setLoading(false)
				setName('')
			})
			.catch((error) => {
				console.log(error.response.data)
				toast.error(error.response.data)
				setLoading(false)
			})
	}
	return (
		<Fragment>
			<TitleHeader title='Create Category' description='Add a category' />
			<Container className='mt-5'>
				<Form>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label className='text-muted'>
							<span className='text-danger'>*</span>Category Name
						</Form.Label>
						<Form.Control
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Button
						variant='primary'
						onClick={handleAddCategory}
						disabled={!valid}
						style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
						<BsPlusCircleFill size={16} />
						Add
						{loading && <Spinner animation='border' role='status' size='sm' />}
					</Button>
				</Form>
			</Container>
		</Fragment>
	)
}

export default CreateCategoryPage
