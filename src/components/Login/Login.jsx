import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import useFetch from '../../hooks/useFetch';
import { setIsLoading } from '../../features/modalSlice';
import { loginService } from '../../services/authServices';
import DataList from '../DataList/DataList';

const Login = ({ setIsRegistering }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const customFetch = useFetch();

	const loginHandler = async (e) => {
		e.preventDefault();
		dispatch(setIsLoading(true));
		const data = await customFetch(loginService, { email, password });
		if (data) dispatch(login(data));
		dispatch(setIsLoading(false));
	};

	const guestHandler = async () => {
		dispatch(setIsLoading(true));
		const guestEmail = process.env.REACT_APP_GUEST_EMAIL?.replace(/['"]+/g, '');
		const guestPassword = process.env.REACT_APP_GUEST_PASSWORD?.replace(
			/['"]+/g,
			''
		);
		const data = await customFetch(loginService, {
			email: guestEmail,
			password: guestPassword,
		});
		if (data) dispatch(login(data));
		dispatch(setIsLoading(false));
	};

	return (
		<form onSubmit={loginHandler} className='login'>
			<div className='email'>
				<label htmlFor='login-email'>Email</label>
				<input
					type='email'
					id='login-email'
					placeholder='johndoe@example.com'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<DataList email={email} setEmail={setEmail} />
			</div>
			<label htmlFor='login-password'>Password</label>
			<input
				type='password'
				id='login-password'
				placeholder='Top secret'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type='submit'>Login</button>
			<p>
				Don't have an account? <br />
				<span onClick={() => setIsRegistering(true)}>Register</span> or{' '}
				<span onClick={guestHandler}>Login as a guest</span>
			</p>
		</form>
	);
};

export default Login;
