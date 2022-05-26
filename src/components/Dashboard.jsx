import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../stylesheets/dashboard.module.css';
import OrderDisplay from '../components/OrderDisplay';
import OrderForm from '../components/OrderForm';
import { useSelector } from 'react-redux';
const data = require('../database/orders.json');

const Dashboard = ({ user, setUser }) => {
	const navigate = useNavigate();
	const selector = useSelector((state) => state.ordersSliceReducer);

	const [orders, setOrders] = useState(selector.orders);

	useEffect(() => {
		setOrders(selector.orders);
	}, [selector]);
	useEffect(() => {
		setOrders(data);
	}, []);

	const [selectedOrder, setSelectedOrder] = useState({
		id: '',
		product: '',
		customer_name: '',
		customer_email: '',
		quantity: '',
	});

	// console.log('ORDERS', orders);

	const signOut = () => {
		// Handling log out button
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(() => {
			setUser({ isAuth: false });
			// console.log('User signed out.');
			navigate('/login');
		});
	};
	return (
		<div className={styles.homeContainer}>
			<section className={styles.navbar}>
				<div className={styles.user}>
					<img
						src={user.profileImg}
						className={styles.userImg}
						alt='profile-img'
					/>
					{user.name}
				</div>
				<div className={styles.logout} onClick={signOut}>
					Logout
				</div>
			</section>
			<section className={styles.content}>
				<section className={styles.leftBox}>
					<OrderDisplay
						orders={orders}
						setOrders={setOrders}
						selectedOrder={selectedOrder}
						setSelectedOrder={setSelectedOrder}
					/>
				</section>
				<section className={styles.rightBox}>
					<OrderForm
						orders={orders}
						setOrders={setOrders}
						selectedOrder={selectedOrder}
						setSelectedOrder={setSelectedOrder}
					/>
				</section>
			</section>
		</div>
	);
};

export default Dashboard;
