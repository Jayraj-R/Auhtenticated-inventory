import { useState } from 'react';
import styles from '../stylesheets/dashboard.module.css';
import { ReactComponent as IconBin } from './../assets/bin-icon.svg';
import { useDispatch } from 'react-redux';
import { ordersActions } from '../reducers/orders-slice';

const OrderDisplay = ({ orders, setSelectedOrder }) => {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();

	const deleteHandler = (index) => {
		console.log('delete', index);
		dispatch(ordersActions.removeOrder(index));
	};

	return (
		<section item xs={12} className={styles.leftContainer}>
			<span className={styles.title}>Orders</span>

			<section className={styles.tableSection}>
				<div className={styles.searchSection}>
					<div className={styles.subtitle}>
						Click on the row to edit the order...
					</div>
				</div>

				<table className={styles.table}>
					<tr className={styles.tableHeaders}>
						<th className={styles.headers}>ORDER ID</th>
						<th className={styles.headers}>PRODUCT</th>
						<th className={styles.headers}>CUSTOMER NAME</th>
						<th className={styles.headers}>CUSTOMER EMAIL</th>
						<th className={styles.headers}>QUANTITY</th>
						<th className={styles.headers}></th>
					</tr>
					{orders.map((order, index) => {
						if (index >= (page - 1) * 11 && index < page * 11) {
							return (
								<tr className={styles.tableRows} key={index}>
									<td
										className={styles.cell}
										onClick={() => setSelectedOrder(order)}
									>
										{order.id}
									</td>
									<td
										className={styles.cell}
										onClick={() => setSelectedOrder(order)}
									>
										{order.product}
									</td>
									<td
										className={styles.cell}
										onClick={() => setSelectedOrder(order)}
									>
										{order.customer_name}
									</td>
									<td
										className={styles.cell}
										onClick={() => setSelectedOrder(order)}
									>
										{order.customer_email}
									</td>
									<td
										className={styles.cell}
										onClick={() => setSelectedOrder(order)}
									>
										{order.quantity}
									</td>
									<td
										className={`${styles.cell} ${styles.bin}`}
										onClick={() => deleteHandler(index)}
									>
										<IconBin />
									</td>
								</tr>
							);
						}
						return <></>;
					})}
				</table>
				<setion className={styles.pagination}>
					<button
						className={styles.paginationBtn}
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
					>
						Prev
					</button>
					<button
						className={styles.paginationBtn}
						disabled={page === 11}
						onClick={() => setPage(page + 1)}
					>
						Next
					</button>
				</setion>
			</section>
		</section>
	);
};

export default OrderDisplay;
