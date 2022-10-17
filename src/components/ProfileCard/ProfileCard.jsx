import React, { useState } from 'react';
import dp from '../../assets/dp.jpg';
import SetupProfile from '../SetupProfile/SetupProfile';
import ImageUpload from '../ImageUpload/ImageUpload';
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../../features/messageSlice';
import Backdrop from '../Backdrop/Backdrop';
import { setIsLoading, showModal } from '../../features/modalSlice';
import './profilecard.css';
import { logout } from '../../features/userSlice';
import getDateString from '../../utils/getDateString';

const ProfileCard = ({ id, isOwnProfile }) => {
	const {
		users: { users },
		user: { isGuest },
	} = useSelector((state) => state);
	const user = users.find((user) => user._id === id) || {};
	const [isEditing, setIsEditing] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	const customFetch = useFetch();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let { name, email, about, dob, location, createdAt, profileImage } = user;
	createdAt = `Joined on ${getDateString(createdAt)}`;
	dob = getDateString(dob);

	const sendMessage = async () => {
		if (isGuest)
			return dispatch(
				showModal({ msg: 'You must be logged in to do this action!!' })
			);
		dispatch(setIsLoading(true));
		dispatch(createChat({ customFetch, id })).then(() => {
			if (window.innerWidth < 801) navigate('/chat/messenger');
			else navigate('/chat');
			dispatch(setIsLoading(false));
		});
	};

	const hideUploading = () => {
		setIsUploading(false);
	};
	const hideEditing = () => {
		setIsEditing(false);
	};

	return (
		<section className='profilecard gradient-border'>
			{isOwnProfile && (
				<>
					<Backdrop show={isEditing} onClose={hideEditing}>
						<SetupProfile close={hideEditing} user={user} />
					</Backdrop>
					<Backdrop show={isUploading} onClose={hideUploading}>
						<ImageUpload close={hideUploading} />
					</Backdrop>
				</>
			)}
			<header>
				<div>
					<img
						src={profileImage || dp}
						alt='profile_image'
						className='profilecard__dp roundimage'
					/>
					{isOwnProfile && (
						<div className='dp-upload'>
							<svg
								onClick={() => setIsUploading(true)}
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'
							>
								<path fill='none' d='M0 0h24v24H0z' />
								<path
									d='M9.828 5l-2 2H4v12h16V7h-3.828l-2-2H9.828zM9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 15a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z'
									fill='rgba(255,255,255,1)'
								/>
							</svg>
						</div>
					)}
				</div>
				<h1>{name || 'User'}</h1>
				<h2>{about || 'About'}</h2>
			</header>
			<article>
				<div className='profilecard__info'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path
							fill='rgba(255,255,255,1)'
							d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z'
						/>
					</svg>
					<h3>{createdAt}</h3>
				</div>
				<div className='profilecard__info'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path
							fill='rgba(255,255,255,1)'
							d='M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'
						/>
					</svg>
					<h3>{location}</h3>
				</div>
				<div className='profilecard__info'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path
							fill='rgba(255,255,255,1)'
							d='M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z'
						/>
					</svg>
					<h3>{email}</h3>
				</div>
				<div className='profilecard__info'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path
							fill='rgba(255,255,255,1)'
							d='M13 7v4h7a1 1 0 0 1 1 1v8h2v2H1v-2h2v-8a1 1 0 0 1 1-1h7V7h2zm6 6H5v7h14v-7zM13.83.402A3 3 0 0 1 12.732 4.5L11 5.5a3 3 0 0 1 1.098-4.098l1.732-1z'
						/>
					</svg>
					<h3>{dob}</h3>
				</div>
			</article>
			{isOwnProfile ? (
				<div className='btn-group'>
					<button onClick={() => dispatch(logout())}>Logout</button>
					<button onClick={() => setIsEditing(true)}>Edit Profile</button>
				</div>
			) : (
				<div className='btn-group'>
					<button onClick={sendMessage}>Message</button>
					<button disabled>Add Friend</button>
				</div>
			)}
		</section>
	);
};

export default ProfileCard;
