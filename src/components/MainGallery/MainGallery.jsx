import React from 'react';
import { Link } from 'react-router-dom';
import './maingallery.css';
import { AiOutlineClose } from 'react-icons/ai';

const MainGallery = ({ posts, onClose }) => {
	return (
		<div className='maingallery'>
			<button onClick={onClose} aria-label='close'>
				<AiOutlineClose />
			</button>
			{posts.map((post) => (
				<Link to={`/post/${post._id}`} key={post._id}>
					<img src={post.image.src} alt='post-images' />
				</Link>
			))}
		</div>
	);
};

export default MainGallery;
