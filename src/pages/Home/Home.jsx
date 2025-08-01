import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../../components/CreatePost/CreatePost';
import InfinityScroll from '../../components/InfinityScroll/InfinityScroll';
import Online from '../../components/Online/Online';
import Posts from '../../components/Post/Posts';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { setAllPosts } from '../../features/postSlice';
import useFetch from '../../hooks/useFetch';
import { fetchPostsService } from '../../services/postServices';
import './home.css';

const Home = () => {
	const {
		post: {
			allPosts: { posts, page },
		},
		user: { id },
	} = useSelector((state) => state);

	console.log(posts);

	const customFetch = useFetch();
	const dispatch = useDispatch();

	const getNextPage = async () => {
		const data = await customFetch(fetchPostsService, { page: page + 1 });
		dispatch(setAllPosts({ posts: posts.concat(data.posts), page: data.page }));
		return data.posts.length;
	};

	return (
		<section className='home'>
			<div className='home__left'>
				<ProfileCard id={id} isOwnProfile />
			</div>
			<InfinityScroll getNextPage={getNextPage}>
				<main className='home__center'>
					<CreatePost />
					<Posts posts={posts} />
				</main>
			</InfinityScroll>
			<aside className='home__right gradient-border'>
				<Online />
			</aside>
		</section>
	);
};

export default Home;
