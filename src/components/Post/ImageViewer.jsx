import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ImageViewer = ({ image, onClose }) => {
	return (
		<div className='imageViewer'>
			<button onClick={onClose} aria-label='close'>
				<AiOutlineClose />
			</button>
			<img src={image} alt='post' />
		</div>
	);
};

export default ImageViewer;
