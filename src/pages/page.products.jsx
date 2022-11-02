import React, { Fragment, useEffect, useState } from 'react'
import TitleHeader from '../components/component.titleHeader'
import { Container, Table } from 'react-bootstrap'
import api from '../services/axios'
import { TiDelete, TiEdit } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const ProductsPage = () => {
	const [products, setProducts] = useState()
	const user = useSelector((state) => state.auth.user)
	const token = useSelector((state) => state.auth.token)
	const navigate = useNavigate()
	const getProducts = () => {
		api
			.get('/products?limit=100')
			.then((response) => setProducts(response.data))
			.catch((error) => console.log(error))
	}

	const handleDelete = (productId) => {
		if (user && token) {
			api
				.delete(`/product/${productId}/${user._id}`, {
					headers: {
						Authorization: 'Bearer ' + token,
					},
				})
				.then((response) => {
					console.log(response.data)
					toast.success('product deleted successfully')
					getProducts()
				})
				.catch((error) => {
					toast.error(error.response.data.error)
					console.log(error.response.data.error)
				})
		}
	}
	useEffect(() => {
		getProducts()
	}, [])

	return (
		<Fragment>
			<TitleHeader title='All Products' />
			<Table striped hover className='mt-3'>
				<thead className='text-center'>
					<th>#</th>
					<th>Product ID</th>
					<th>Product Name</th>
					<th>Price</th>
					<th>Category</th>
					<th>Quantity</th>
					<th>Sold</th>
					<th>Shipping</th>
					<th>Actions</th>
				</thead>
				<tbody>
					{products?.map((product, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{product._id}</td>
							<td>{product.name}</td>
							<td>₹{product.price}</td>
							<td>{product.category.name}</td>
							<td>{product.quantity}</td>
							<td>{product.sold}</td>
							<td>{product.shipping.toString()}</td>
							<td>
								<Container className='d-flex justify-content-between'>
									<TiEdit
										size={24}
										style={{ cursor: 'pointer', color: '#008040' }}
										onClick={() =>
											user
												? navigate(`/${user._id}/product/update/${product._id}`)
												: null
										}
									/>
									<TiDelete
										size={24}
										style={{ cursor: 'pointer', color: '#a50100' }}
										onClick={() => handleDelete(product._id)}
									/>
								</Container>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Fragment>
	)
}

export default ProductsPage
