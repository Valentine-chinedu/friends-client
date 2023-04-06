import React, { useState } from 'react';
import { useEffect } from 'react';
import './options.css';
import { HiDotsVertical } from 'react-icons/hi';

const Options = ({ options, id = '' }) => {
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (
				e.target.id !== 'options' + id &&
				e.target.id !== 'options__icon' + id
			) {
				setIsOptionsVisible(false);
			}
		};
		document.body.addEventListener('click', handleOutsideClick);
		return () => document.body.removeEventListener('click', handleOutsideClick);
	}, [id]);

	const handleClick = (handler) => {
		setIsOptionsVisible(false);
		handler();
	};

	return (
		<div
			className='options'
			id={'options' + id}
			onClick={() => setIsOptionsVisible((val) => !val)}
		>
			<HiDotsVertical className='options__icon' id={'options__icon' + id} />
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
