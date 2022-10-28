import React from 'react'
import Container from 'react-bootstrap/Container'
const TitleHeader = ({ title, description }) => {
	return (
		<Container
			fluid
			style={{
				backgroundColor: '#389fbc',
				color: 'ghostwhite',
				textAlign: 'center',
				padding: '2.5rem',
			}}>
			<h1 style={{ fontWeight: 600, fontSize: '4rem' }}>{title}</h1>
			<h4 style={{ fontWeight: 200 }}>{description}</h4>
		</Container>
	)
}

export default TitleHeader
