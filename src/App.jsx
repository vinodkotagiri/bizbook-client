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
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			dispatch(loginUser(JSON.parse(localStorage.getItem('auth'))))
		}
	}, [])

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
					<Route
						path=':userId/create-category'
						element={<CreateCategoryPage />}
					/>
					<Route
						path=':userId/create-product'
						element={<CreateProductPage />}
					/>
				</Route>
			</Routes>
			<Toaster position='top-right' reverseOrder={false} />
		</>
	)
}

export default App
