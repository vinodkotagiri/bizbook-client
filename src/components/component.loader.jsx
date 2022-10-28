import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
const Loader = () => {
	return (
		<div
			style={{
				margin: '0 auto',
				width: '100vw',
				height: '60vh',
				position: 'relative',
			}}>
			<Spinner
				animation='border'
				variant='info'
				as='div'
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
				}}
			/>
		</div>
	)
}

export default Loader
