import React from 'react';
import { Link } from 'react-router-dom';
import './maingallery.css';

const MainGallery = ({ posts, close }) => {
	return (
		<div className='maingallery'>
			<button onClick={close} aria-label='close'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					width='24'
					height='24'
				>
					<path fill='none' d='M0 0h24v24H0z' />
					<path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' />
				</svg>
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
