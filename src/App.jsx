import React from 'react'
import TopNav from './components/component.navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/page.home'
import LoginPage from './pages/page.login'
import DashboardPage from './pages/page.dashboard'
import RegisterPage from './pages/page.register'
import CreateCategoryPage from './pages/page.createcategory'
import CreateProductPage from './pages/page.createproduct'
import ShopPage from './pages/page.shopPage'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { loginUser } from './features/authSlice'
import { addItem } from './features/cartSlice'
import { useDispatch } from 'react-redux'
import ProductPage from './pages/page.product'
import CartPage from './pages/page.cart'
import CheckoutPage from './pages/page.checkout'
import OrdersPage from './pages/page.orders'
import ProfileUpdatePage from './pages/page.profileUpdate'
import ProductsPage from './pages/page.products'
import UpdateProductPage from './pages/page.updateProduct'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		if (localStorage.getItem('user') && localStorage.getItem('token')) {
			const user = JSON.parse(localStorage.getItem('user'))
			const token = JSON.parse(localStorage.getItem('token'))
			dispatch(
				loginUser({
					user,
					token,
				})
			)
		}
		if (localStorage.getItem('cart'))
			dispatch(addItem(JSON.parse(localStorage.getItem('cart'))))
	}, [dispatch])

	return (
		<>
			<Routes>
				<Route path='/' element={<TopNav />}>
					<Route index element={<HomePage />} />
					<Route path='*' element={<Navigate to='/' />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='dashboard' element={<DashboardPage />} />
					<Route path='shop' element={<ShopPage />} />
					<Route path='cart' element={<CartPage />} />
					<Route path='checkout' element={<CheckoutPage />} />
					<Route path=':userId/orders' element={<OrdersPage />} />
					<Route path='update/:userId' element={<ProfileUpdatePage />} />
					<Route path=':adminId/products' element={<ProductsPage />} />
					<Route
						path=':adminId/product/update/:productId'
						element={<UpdateProductPage />}
					/>
					<Route
						path=':userId/create-category'
						element={<CreateCategoryPage />}
					/>
					<Route
						path=':userId/create-product'
						element={<CreateProductPage />}
					/>
					<Route path='product/:productId' element={<ProductPage />} />
				</Route>
			</Routes>
			<Toaster position='top-right' reverseOrder={false} />
		</>
	)
}

export default App
