import { useEffect, useState } from 'react';
import styles from '../stylesheets/dashboard.module.css';
import { useDispatch } from 'react-redux';
import { ordersActions } from '../reducers/orders-slice';

const OrderForm = ({ selectedOrder, setSelectedOrder }) => {
	const [error, setError] = useState('');
	const [order, setOrder] = useState(selectedOrder);
	const dispatch = useDispatch();

	const clearHandler = () => {
		setSelectedOrder({
			id: '',
			product: '',
			customer_name: '',
			customer_email: '',
			quantity: '',
		});
	};

	useEffect(() => {
		setOrder(selectedOrder);
	}, [selectedOrder]);

	const SubmitHandler = () => {
		if (
			order.id === '' ||
			order.product === '' ||
			order.customer_name === '' ||
			order.customer_email === '' ||
			order.quantity === ''
		) {
			setError('Kindly fill all the fields');
		} else if (order.quantity <= 0) {
			setError('Quantity must be greater than 0');
		} else if (selectedOrder.id === '') {
			// Adding new order
			setError('');
			console.log('add');
			dispatch(ordersActions.addOrder(order));
			clearHandler();
		} else if (selectedOrder.id !== '') {
			// Updating old order
			setError('');
			console.log('update');
			dispatch(ordersActions.updateOrder(order));
			clearHandler();
		}
	};
	return (
		<section item xs={12} className={styles.rightContainer}>
			<span className={styles.title}>Create/Edit Orders</span>

			<section className={styles.formSection}>
				{order.id !== '' && (
					<div className={styles.formRow}>
						<button className={styles.clear} onClick={clearHandler}>
							Clear
						</button>
					</div>
				)}

				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<span className={styles.formLabel}>Product ID</span>
						<input
							type='text'
							className={styles.formInput}
							// disabled={selectedOrder.id !== '' ? true : false}
							placeholder='Enter order ID'
							value={order.id !== '' ? order.id : ''}
							onChange={(e) => setOrder({ ...order, id: e.target.value })}
						/>
					</div>
					<div className={styles.formGroup}>
						<span className={styles.formLabel}>Product name</span>
						<select
							name='product'
							id='product'
							placeholder='Select a product'
							className={styles.formInput}
							onChange={(e) => setOrder({ ...order, product: e.target.value })}
						>
							<option value=''>Select a product...</option>
							<option
								value='Product 1'
								selected={order.product === 'Product 1'}
							>
								Product 1
							</option>
							<option
								value='Product 2'
								selected={order.product === 'Product 2'}
							>
								Product 2
							</option>
							<option
								value='Product 3'
								selected={order.product === 'Product 3'}
							>
								Product 3
							</option>
						</select>
					</div>
				</div>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<span className={styles.formLabel}>Customer name</span>
						<input
							type='text'
							className={styles.formInput}
							placeholder='Enter Customer name'
							value={order.id !== '' ? order.customer_name : ''}
							onChange={(e) =>
								setOrder({ ...order, customer_name: e.target.value })
							}
						/>
					</div>
					<div className={styles.formGroup}>
						<span className={styles.formLabel}>Customer email</span>
						<input
							type='text'
							className={styles.formInput}
							value={order.id !== '' ? order.customer_email : ''}
							onChange={(e) =>
								setOrder({ ...order, customer_email: e.target.value })
							}
							placeholder='Enter customer email ID'
						/>
					</div>
				</div>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<span className={styles.formLabel}>Quantity</span>
						<input
							type='text'
							className={styles.formInput}
							placeholder='Enter order name'
							value={order.id !== '' ? order.quantity : ''}
							onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
						/>
					</div>
				</div>
				<span className={styles.error}>{error}</span>

				<div className={styles.formRow} style={{ justifyContent: 'center' }}>
					<div className={styles.formGroup} style={{ width: '100%' }}>
						<button className={styles.formBtn} onClick={SubmitHandler}>
							{selectedOrder.id !== '' ? 'Update order' : 'Create new order'}
						</button>
					</div>
				</div>
			</section>
		</section>
	);
};

export default OrderForm;
