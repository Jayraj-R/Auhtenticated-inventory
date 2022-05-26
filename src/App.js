import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

function App() {
	const [user, setUser] = useState({ isLoggedIn: false });
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						exact
						path='/'
						element={
							user.isLoggedIn ? (
								<Dashboard user={user} setUser={setUser} />
							) : (
								<Navigate to='/login' />
							)
						}
					/>
					<Route
						exact
						path='/login'
						element={<Login user={user} setUser={setUser} />}
					/>
				</Routes>
			</Router>
			{/* <Login /> */}
		</div>
	);
}

export default App;
