import React, { useState, useEffect, useRef } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveScreen } from '../store/screenSlice';
import { fetchPosts } from '../store/postsSlice';
import { likePost } from '../store/postsSlice';
import { fetchUserProfile } from '../store/userSlice';

export default function PostWall() {
    const [isLoading, setIsLoading] = useState(false);
    // const containerRef = useRef(null);
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.auth);
    console.log(posts);

    // useEffect(() => {
    //     const initialImages = Array.from({ length: 7 }, (_, index) => `assets/image${index + 1}.jpg`);
    //     setImages(initialImages);
    // }, []);

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // const handleScroll = () => {
    //     if (!isLoading && containerRef.current) {
    //         const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    //         if (scrollTop + clientHeight >= scrollHeight - 100) {
    //             loadMoreImages();
    //         }
    //     }
    // };

    // const loadMoreImages = () => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         const newImages = Array.from(
    //             { length: 7 },
    //             (_, index) => `assets/image${images.length + index + 1}.jpg`
    //         );
    //         setImages((prevImages) => [...prevImages, ...newImages]);
    //         setIsLoading(false);
    //     }, 500);
    // };
    const handleLike = (postId) => {
        dispatch(likePost(postId));
    };

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUserProfile());
    }, []);

    return (
        <div className="my-8 px-2 h-screen">
            <div className="grid group-cols-2 md:grid-cols-2 gap-2">
                {posts.map((post, index) => {
                    return (
                        <div key={index} className="relative">
                            <img
                                src={post.image}
                                alt="gallery"
                                className="w-full h-full object-cover rounded-2xl"
                                onClick={() => dispatch(setActiveScreen('postViewStory'))}
                                onDoubleClick={() => handleLike(post._id)}
                            />
                            <div
                                className="absolute bottom-0 right-0 m-1 cursor-pointer"
                                onClick={() => handleLike(post._id)}
                            >
                                {post.likes.includes(user._id) ? (
                                    <AiFillHeart className="text-red-500 text-3xl" />
                                ) : (
                                    <AiOutlineHeart className="text-white text-3xl" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            {isLoading && <p className="text-center text-lg mt-2">Loading...</p>}
        </div>
    );
}