import React, { useState } from 'react';
import './input.css';
import EmojiPicker from './EmojiPicker';
import { useRef } from 'react';
import { useEffect } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const Input = ({ placeholder, handler, showEmoji, initialValue = '' }) => {
	const submitHandler = async (e) => {
		e.preventDefault();
		emojiRef.current?.close();
		if (value.trim()) handler(value.trim());
		setValue('');
	};
	const [value, setValue] = useState(initialValue);
	const emojiRef = useRef();

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

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
				<AiOutlineSend />
			</button>
		</form>
	);
};

export default Input;
