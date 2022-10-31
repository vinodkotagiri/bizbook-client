import React, { useState, useEffect } from 'react'
import { Form, Button, FormGroup, Container } from 'react-bootstrap'
import api from '../services/axios'
import queryString from 'query-string'
import { Row } from 'react-bootstrap'
import ProductCard from './component.productCard'
const Search = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [categories, setCategories] = useState([])
	const [searchedResults, setSearchedResults] = useState([])
	const [searched, setSearched] = useState(false)
	//Get categories List when the page loads
	useEffect(() => {
		;(() =>
			api
				.get('/categories')
				.then((response) => setCategories(response.data))
				.catch((error) => console.log(error)))()
		if (searchTerm === '') setSearched(false)
	}, [searchTerm])
	const handleSubmit = (e) => {
		e.preventDefault()
		const query = queryString.stringify({
			search: searchTerm || undefined,
			category: selectedCategory,
		})
		api
			.get(`/products/search?${query}`)
			.then((response) => {
				setSearchedResults(response.data)
				setSearched(true)
			})
			.catch((error) => console.log(error))
	}
	return (
		<>
			<Container className='d-flex justify-content-center mt-3'>
				<Form onSubmit={handleSubmit} style={{ width: '30%' }}>
					<FormGroup className='d-flex'>
						<Form.Select
							style={{ width: '300px' }}
							onChange={(e) => setSelectedCategory(e.target.value)}>
							<option value='All'>All</option>
							{categories?.map((category, index) => (
								<option key={index} value={category._id}>
									{category.name.charAt(0).toUpperCase() +
										category.name.substr(1, category.name.length)}
								</option>
							))}
						</Form.Select>
						<Form.Control
							onChange={(e) => {
								setSearchTerm(e.target.value)
							}}
							className='mx-2'
							type='search'
							placeholder='Search'
							aria-label='Search'
							style={{ width: '300px' }}
						/>
						<Button
							type='submit'
							style={{
								backgroundColor: '#389FBC',
								outline: 'none',
								border: 'none',
							}}>
							Search
						</Button>
					</FormGroup>
				</Form>
			</Container>
			{searched && (
				<Container fluid>
					<h1 className='my-3 text-muted'>
						{searchedResults.length > 0
							? `Found ${searchedResults.length} Products`
							: 'No Products Found'}
					</h1>
					<Row className='px-3'>
						{searchedResults &&
							searchedResults.map((product, index) => (
								<ProductCard product={product} key={index} />
							))}
					</Row>
				</Container>
			)}
		</>
	)
}

export default Search
