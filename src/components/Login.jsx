import '../stylesheets/login.css';
import { ReactComponent as IconGoogle } from './../assets/google-icon.svg';
import { gapi, loadAuth2 } from 'gapi-script';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
	const navigate = useNavigate();
	useEffect(() => {
		// Enabling google signin
		const setAuth2 = async () => {
			const auth2 = await loadAuth2(gapi, process.env.REACT_APP_CLENT_ID, '');
			if (auth2.isSignedIn.get()) {
				updateUser(auth2.currentUser.get());
			} else {
				attachSignin(document.getElementById('loginBtn'), auth2);
			}
		};
		setAuth2();
	}, []);

	const updateUser = (currentUser) => {
		// getting basic informatin about the user

		const name = currentUser.getBasicProfile().getName();
		const profileImg = currentUser.getBasicProfile().getImageUrl();
		setUser({
			name: name,
			profileImg: profileImg,
			token: currentUser.xc.access_token,
			isLoggedIn: true,
		});
		navigate('/');
	};

	const attachSignin = (element, auth2) => {
		// Updating user variable
		auth2.attachClickHandler(
			element,
			{},
			(googleUser) => {
				updateUser(googleUser);
			},
			(error) => {
				console.log(JSON.stringify(error));
			}
		);
	};

	return (
		<div className='container'>
			<div className='paper'>
				<span className='paper__title'>SIGN IN</span>
				<span className='paper__subtitle'>
					Sign in using your google account
				</span>
				<button className='paper__signBtn' id='loginBtn'>
					<IconGoogle className='paper_googleIcon' />
					Sign In
				</button>
			</div>
		</div>
	);
};

export default Login;
