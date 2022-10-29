import React, { Fragment, useEffect } from 'react'
import AdminDashboard from '../components/component.admindashboard'
import UserDashboard from '../components/component.userdashboard'
import { useSelector } from 'react-redux'
import Loader from '../components/component.loader'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const DashboardPage = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const user = useSelector((state) => state.auth.user)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		navigate(location.pathname)
		setTimeout(() => {
			setLoading(false)
		}, 2000)
		if (!user) setLoading(true)
	}, [])
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					{user?.role === 1 ? <AdminDashboard /> : <UserDashboard />}
				</Fragment>
			)}
		</Fragment>
	)
}

export default DashboardPage
