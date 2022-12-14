import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deletePost,
	setEditingPost,
	commentPost,
	likePost,
} from '../../features/postSlice';
import dp from '../../assets/dp.jpg';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Options from '../Options/Options';
import './post.css';
import getDateString from '../../utils/getDateString';

const Post = ({ singlepost, post }) => {
	const createdAt = getDateString(post.createdAt);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	//global states
	const {
		user: { id },
		users: { usersOnline },
	} = useSelector((state) => state);
	const isOwnPost = id === post.createdBy;
	const isLiked = post.likes?.includes(id);
	const isOnline = usersOnline.some((user) => user.id === post.createdBy);

	const likeHandler = () => {
		dispatch(likePost({ customFetch, id: post._id, isLiked }));
	};

	const commentHandler = (comment) => {
		dispatch(commentPost({ customFetch, id: post._id, comment }));
	};

	const deleteHandler = () => {
		dispatch(deletePost({ customFetch, id: post._id }));
	};

	const editHandler = () => {
		dispatch(setEditingPost(post));
	};

	const options = {
		Delete: deleteHandler,
		Edit: editHandler,
	};

	const getParagraphs = (text) => {
		const paragraphArray = text.split(/[\n\r]/g);
		return paragraphArray.map(
			(para, i) =>
				para && (
					<p className='post__caption' key={i}>
						{para}
					</p>
				)
		);
	};

	const getNumberOfLikes = () => {
		if (post.likes?.length) {
			return post.likes?.includes(id)
				? post.likes?.length - 1 === 0
					? 'You'
					: post.likes?.length - 1 === 1
					? 'You and 1 more'
					: `You and ${post.likes.length - 1} others`
				: post.likes?.length;
		}
		return false;
	};

	const postDetails = () => {
		return (
			<>
				{post.caption && getParagraphs(post.caption)}
				{post.image?.src && (
					<img src={post.image?.src} alt='post_image' className='post__image' />
				)}
			</>
		);
	};

	return (
		<article
			className={singlepost ? 'post halfborder single' : 'post gradient-border'}
		>
			<header>
				<Link
					to={`/user/${post.createdBy}`}
					className={isOnline ? 'green' : ''}
				>
					<img
						src={post.userDetails?.image || dp}
						alt='profileImage'
						className='post__dp roundimage'
					/>
				</Link>
				<div>
					<h3>{post.userDetails?.name}</h3>
					<p>{createdAt}</p>
				</div>
				{isOwnPost && <Options options={options} />}
			</header>
			<div className='post__details'>
				{singlepost ? (
					postDetails()
				) : (
					<Link to={`/post/${post._id}`} className='post__details'>
						{postDetails()}
					</Link>
				)}
			</div>
			<div className='post__footer'>
				<div className='post__reactions'>
					<img
						src={
							isLiked ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									width='24'
									height='24'
								>
									<path fill='none' d='M0 0H24V24H0z' />
									<path d='M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z' />
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									width='24'
									height='24'
								>
									<path fill='none' d='M0 0H24V24H0z' />
									<path d='M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z' />
								</svg>
							)
						}
						alt='like'
						onClick={likeHandler}
					/>
					<p>{getNumberOfLikes() || ''}</p>
				</div>
				{singlepost || (
					<Input placeholder={'Write a comment...'} handler={commentHandler} />
				)}
			</div>
		</article>
	);
};

export default Post;
