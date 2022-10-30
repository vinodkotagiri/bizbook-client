import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductCard from '../components/component.productCard'
import TitleHeader from '../components/component.titleHeader'
import axios from '../services/axios'
const HomePage = () => {
	const [newArrivals, setNewArrivals] = useState([])
	const [mostSelling, setMostSelling] = useState([])
	const getProductsByArrival = () => {
		axios
			.get('/products?sortBy=createdAt&order=desc&limit=6')
			.then((response) => setNewArrivals(response.data))
			.catch((error) => console.log(error))
	}
	const getProductsBySold = () => {
		axios
			.get('/products?sortBy=sold&order=desc&limit=6')
			.then((response) => setMostSelling(response.data))
			.catch((error) => console.log(error))
	}
	useEffect(() => {
		getProductsByArrival()
		getProductsBySold()
	}, [])
	return (
		<Fragment>
			<TitleHeader title='BizBook.io' description='Home page ' />
			<Container fluid>
				<h1 className='my-3 text-muted'>New Arrivals</h1>
				<Row className='px-3'>
					{newArrivals.map((product) => (
						<ProductCard product={product} />
					))}
				</Row>
				<h1 className='my-3 text-muted'>Most Selling</h1>
				<Row className='px-3'>
					{mostSelling.map((product) => (
						<ProductCard product={product} />
					))}
				</Row>
			</Container>
		</Fragment>
	)
}

export default HomePage
