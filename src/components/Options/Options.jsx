import React, { useState } from 'react';
import { useEffect } from 'react';
import './options.css';

const Options = ({ options }) => {
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);

	const handleOutsideClick = (e) => {
		if (
			!e.target.classList.contains('options') &&
			!e.target.classList.contains('options__icon')
		) {
			setIsOptionsVisible(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleOutsideClick);
		return () => document.body.removeEventListener('click', handleOutsideClick);
	});

	const handleClick = (handler) => {
		setIsOptionsVisible(false);
		handler();
	};

	return (
		<div className='options' onClick={() => setIsOptionsVisible((val) => !val)}>
			<svg
				className='options__icon'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				width='24'
				height='24'
			>
				<path fill='none' d='M0 0h24v24H0z' />
				<path d='M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
			</svg>
			<ul className={isOptionsVisible ? 'show' : ''}>
				{Object.entries(options).map(([title, handler], i) => (
					<li onClick={() => handleClick(handler)} key={i}>
						{title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Options;
