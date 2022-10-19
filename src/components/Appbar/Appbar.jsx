import React, { useState } from 'react';
import dp from '../../assets/dp.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, toggleSidebar } from '../../features/modalSlice';
import useFetch from '../../hooks/useFetch';
import SearchResults from '../SearchResults/SearchResults';
import { fetchUsersService } from '../../services/userServices';
import { fetchPostsService } from '../../services/postServices';
import './appbar.css';
import { logout } from '../../features/userSlice';

const Appbar = () => {
	//global states
	const {
		user: { id, profileImage, isGuest },
		modal: { isSidebarVisible },
	} = useSelector((state) => state);

	//local states
	const [query, setQuery] = useState('');
	const [searchResult, setSearchResult] = useState({});

	const dispatch = useDispatch();
	const customFetch = useFetch();

	const searchHandler = async (e) => {
		e.preventDefault();
		if (query.length > 0) {
			dispatch(setIsLoading(true));
			const { posts } = await customFetch(fetchPostsService, { query });
			const { users } = await customFetch(fetchUsersService, { query });
			setSearchResult({ posts, users });
			dispatch(setIsLoading(false));
		}
	};

	const reset = () => {
		setQuery('');
		setSearchResult({});
	};

	const gotoLogin = () => dispatch(logout());

	return (
		<header
			className={
				searchResult.posts || searchResult.users ? 'appbar topZ' : 'appbar'
			}
		>
			<div
				className='hamburger'
				onClick={() => dispatch(toggleSidebar(!isSidebarVisible))}
			>
				{isSidebarVisible ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path
							fill='rgba(255,255,255,1)'
							d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'
						/>
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path
							fill='rgba(255,255,255,1)'
							d='M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z'
						/>
					</svg>
				)}
			</div>
			<Link to='/'>
				<svg
					className='home-icon'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					width='32'
					height='32'
				>
					<path fill='none' d='M0 0h24v24H0z' />
					<path
						fill='rgba(255,255,255,1)'
						d='M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z'
					/>
				</svg>
			</Link>
			<form onSubmit={searchHandler} className='searchform'>
				<button type='submit' aria-label='search'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path
							fill='rgba(255,255,255,1)'
							d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z'
						/>
					</svg>
				</button>
				<input
					type='text'
					placeholder='Tap to search...'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button onClick={reset} type='button' aria-label='clear search'>
					<svg
						className='close'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path
							fill='rgba(255,255,255,1)'
							d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'
						/>
					</svg>
				</button>
				{(searchResult.posts || searchResult.users) && (
					<SearchResults searchResult={searchResult} reset={reset} />
				)}
			</form>
			<nav className='appbar__profile'>
				{isGuest ? (
					<button className='login-btn' onClick={gotoLogin}>
						Login
					</button>
				) : (
					<>
						<Link to={`/user/${id}`}>
							<img
								src={profileImage || dp}
								alt='profileImage'
								className='appbar__profile__dp'
								title='profile'
							/>
						</Link>
						<Link to='/chat'>
							<svg
								className='chat'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='32'
								height='32'
							>
								<path fill='none' d='M0 0h24v24H0z' />
								<path
									fill='rgba(255,255,255,1)'
									d='M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17z'
								/>
							</svg>
						</Link>
					</>
				)}
			</nav>
		</header>
	);
};

export default Appbar;
