import React, { useState } from 'react';

import './input.css';
import EmojiPicker from './EmojiPicker';
import { useRef } from 'react';

const Input = ({ placeholder, handler, showEmoji }) => {
	const submitHandler = async (e) => {
		e.preventDefault();
		emojiRef.current?.close();
		if (value.trim()) await handler(value.trim());
		setValue('');
	};
	const [value, setValue] = useState('');
	const emojiRef = useRef();
	return (
		<form className='input__box' onSubmit={submitHandler}>
			{showEmoji && <EmojiPicker setValue={setValue} ref={emojiRef} />}
			<input
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onFocus={() => emojiRef.current?.close()}
			/>
			<button type='submit' aria-label='submit'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					width='24'
					height='24'
				>
					<path fill='none' d='M0 0h24v24H0z' />
					<path d='M1.923 9.37c-.51-.205-.504-.51.034-.689l19.086-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.475.553-.717.07L11 13 1.923 9.37zm4.89-.2l5.636 2.255 3.04 6.082 3.546-12.41L6.812 9.17z' />
				</svg>
			</button>
		</form>
	);
};

export default Input;
