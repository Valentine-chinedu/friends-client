import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../../features/postSlice';
import useFetch from '../../hooks/useFetch';
import Compress from 'compress.js';
import './createpost.css';

const initialForm = { image: null, preview: null, caption: '' };

const CreatePost = ({ post, id, close }) => {
	// local states
	const [form, setForm] = useState(initialForm);

	useEffect(() => {
		if (post && post._id) {
			setForm({ image: null, preview: post.image?.src, caption: post.caption });
		}
	}, [post]);

	const dispatch = useDispatch();
	const customFetch = useFetch();
	const compress = new Compress();

	const compressImage = async (files) => {
		const options = {
			size: 1,
			quality: 0.75,
			maxWidth: 1920,
			maxHeight: 1920,
			resize: true,
			rotate: false,
		};
		const data = await compress.compress(files, options);
		return data;
	};

	const loadImage = async (e) => {
		const input = e.target;
		if (!input) return;
		var reader = new FileReader();
		reader.onload = function (e) {
			setForm((form) => ({ ...form, preview: e.target.result }));
		};
		input.files[0] && reader.readAsDataURL(input.files[0]);
		const files = [...input.files];
		const data = await compressImage(files);
		const image = Compress.convertBase64ToFile(data[0]?.data, data[0]?.ext);
		setForm((form) => ({ ...form, image }));
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', form.image);
		formData.append('caption', form.caption.trim());
		if (post?._id) {
			dispatch(updatePost({ customFetch, id: post._id, formData }));
			close();
		} else {
			dispatch(addPost({ customFetch, formData }));
		}
		setForm(initialForm);
	};

	return (
		<article className='createpost gradient-border'>
			<form onSubmit={submitHandler}>
				<textarea
					placeholder="What's on your mind?"
					value={form.caption}
					onChange={(e) => setForm({ ...form, caption: e.target.value })}
				/>
				{form.preview && (
					<div className='uploaded-image'>
						<img src={form.preview} alt='uploaded file' />
						<div
							className='close-icon'
							onClick={() => setForm({ ...form, image: null, preview: null })}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'
							>
								<path fill='' d='M0 0h24v24H0z' />
								<path
									fill='rgba(255,255,255,1)'
									d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'
								/>
							</svg>
						</div>
					</div>
				)}
				<div className='btns'>
					<label htmlFor={id || 'image'} aria-label='select file'>
						<div>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'
							>
								<path fill='none' d='M0 0h24v24H0z' />
								<path
									fill='rgba(255,255,255,1)'
									d='M9 2.003V2h10.998C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6-5.997zM5.83 8H9V4.83L5.83 8zM11 4v5a1 1 0 0 1-1 1H5v10h14V4h-8z'
								/>
							</svg>
						</div>
					</label>
					<input
						type='file'
						id={id || 'image'}
						accept='image/png, image/jpeg'
						onChange={loadImage}
					/>
					<button type='submit' aria-label='submit'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							width='24'
							height='24'
						>
							<path fill='none' d='M0 0h24v24H0z' />
							<path
								fill='rgba(255,255,255,1)'
								d='M1.923 9.37c-.51-.205-.504-.51.034-.689l19.086-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.475.553-.717.07L11 13 1.923 9.37zm4.89-.2l5.636 2.255 3.04 6.082 3.546-12.41L6.812 9.17z'
							/>
						</svg>
					</button>
				</div>
			</form>
		</article>
	);
};

export default CreatePost;
