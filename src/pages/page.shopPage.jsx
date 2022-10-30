import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import TitleHeader from '../components/component.titleHeader'
import api from '../services/axios'
import ProductCard from '../components/component.productCard'
const ShopPage = () => {
	//State Variables
	const [categories, setCategories] = useState([])
	const [checked, setChecked] = useState([])
	const [selectedPrice, setSelectedPrice] = useState([])
	const [limit, setLimit] = useState(6)
	const [skip, setSkip] = useState(0)
	const [size, setSize] = useState(0)
	const [filteredProducts, setFilteredProducts] = useState([])

	//Price range variable
	const prices = [
		{
			_id: 0,
			name: 'Any',
			array: [],
		},
		{
			_id: 1,
			name: '₹0 to ₹200',
			array: [0, 200],
		},
		{
			_id: 2,
			name: '₹201 to ₹500',
			array: [201, 500],
		},
		{
			_id: 3,
			name: '₹501 to ₹1500',
			array: [501, 1500],
		},
		{
			_id: 4,
			name: '₹1501 and above',
			array: [1501, 9999],
		},
	]
	//Get categories List when the page loads
	useEffect(() => {
		;(() =>
			api
				.get('/categories')
				.then((response) => setCategories(response.data))
				.catch((error) => console.log(error)))()
	}, [])
	//Handle categories checkbox toggle
	const handleCategoryToggle = (e) => {
		//check if the category id already exists in checked array state variable
		const categoryInArrayIndex = checked.indexOf(e.target.name)
		const selectedCategories = [...checked]
		//If the category id already exists, pop it out of checked array
		// Otherwise, push it the array
		if (categoryInArrayIndex !== -1)
			selectedCategories.splice(categoryInArrayIndex, 1)
		else selectedCategories.push(e.target.name)
		setChecked(selectedCategories)
	}
	//Handle the price Change event
	const handlePriceChange = (e) => {
		setSelectedPrice(prices[e.target.value].array)
	}

	//Fetch Products based on filters
	const updateProductsBasedOnFilters = (skip, limit) => {
		const filters = { category: checked, price: selectedPrice }
		const data = { skip, limit, filters }
		api
			.post('/products/by/search', data)
			.then((response) => {
				setFilteredProducts(response.data.data)
				setSize(response.data.size)
				setSkip(0)
			})
			.catch((error) => console.log(error))
	}
	//Function to handle load more button
	const handleLoadMore = () => {
		let toSkip = skip + limit
		setSkip(toSkip)
		updateProductsBasedOnFilters(toSkip, limit)
	}

	useEffect(() => {
		updateProductsBasedOnFilters(skip, limit)
	}, [checked, selectedPrice, skip])

	return (
		<>
			<TitleHeader title='Shop' description='Shop ultimate books collection' />
			<Container fluid className='mt-3'>
				<Row>
					<Col
						md={2}
						style={{ height: '100vh', borderRight: '2px solid #a6a6a6' }}>
						<Form>
							<h6 className='text-muted'>Filter By Categories</h6>
							<Form.Group className='mb-3' controlId='formBasicCheckbox'>
								{categories.map((category, index) => (
									<Form.Check
										type='checkbox'
										key={index}
										label={
											category.name.charAt(0).toUpperCase() +
											category.name.substr(1, category.name.length)
										}
										name={category._id}
										onChange={handleCategoryToggle}
									/>
								))}
							</Form.Group>
							<hr />
							<h6 className='text-muted'>Filter By Price Range</h6>
							<Form.Group className='mb-3' controlId='formBasicCheckbox'>
								{prices.map((price, index) => (
									<div key={index}>
										<input
											type='radio'
											name='price'
											value={`${price._id}`}
											onChange={handlePriceChange}
										/>
										<Form.Label className=''>&ensp;{price.name}</Form.Label>
									</div>
								))}
							</Form.Group>
						</Form>
					</Col>
					<Col md={10}>
						<Container fluid>
							<h1 className='my-3 text-muted'>Filtered Products</h1>
							<Row className='px-3'>
								{filteredProducts?.map((product) => (
									<ProductCard product={product} />
								))}
							</Row>
						</Container>
						{size > 0 && size >= limit && (
							<Button onClick={handleLoadMore}>Load More</Button>
						)}
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default ShopPage
