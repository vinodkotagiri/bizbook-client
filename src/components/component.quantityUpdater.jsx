import React, { useEffect, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { increaseQty, decreaseQty } from '../features/cartSlice'
const QuantityUpdater = ({ product }) => {
	const { _id } = product
	const { count } = product
	const dispatch = useDispatch()
	return (
		<div className='d-flex align-items-center justify-content-center'>
			<BsChevronLeft
				size={24}
				style={{ cursor: 'pointer' }}
				onClick={() => {
					dispatch(decreaseQty(_id))
				}}
			/>
			<h4
				className='text-muted'
				style={{ width: '1.5rem', textAlign: 'center' }}>
				{count}
			</h4>
			<BsChevronRight
				size={24}
				style={{ cursor: 'pointer' }}
				onClick={() => {
					dispatch(increaseQty(_id))
				}}
			/>
		</div>
	)
}

export default QuantityUpdater
