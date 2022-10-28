import React, { Fragment } from 'react'
import AdminDashboard from '../components/component.admindashboard'
import UserDashboard from '../components/component.userdashboard'
import { useSelector } from 'react-redux'
const DashboardPage = () => {
	const user = useSelector((state) => state.auth.user)

	return (
		<Fragment>
			{user.role === 1 ? <AdminDashboard /> : <UserDashboard />}
		</Fragment>
	)
}

export default DashboardPage
