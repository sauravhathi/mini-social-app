import React, { useState, useEffect, useRef } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { navigateToPreviousScreen } from '../../../store/screenSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function PostViewStory() {
  const dispatch = useDispatch();
  // State variables
  const [stories, setStories] = useState([
    {
      username: 'username1',
      name: 'Arun Kumar',
      profilePic: 'assets/user.jpg',
      story: [
        {
          storyid: 123,
          image: 'assets/image1.jpg',
          time: '20 min ago',
          location: 'Arunachal Pradesh',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          liked: [
            {
              username: 'username1',
            },
            {
              username: 'username2',
            },
          ],
        },
        {
          storyid: 124,
          image: 'assets/image2.jpg',
          time: '20 min ago',
          location: 'Arunachal Pradesh',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          liked: [
            {
              username: 'username1',
            },
            {
              username: 'username2',
            },
          ],
        },
      ],
    },
  ]);

  const [logedInUser, setLoggedInUser] = useState({
    username: 'hero',
    name: 'Hero Kumar',
    profilePic: 'assets/user.jpg',
  });

  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);

  // Progress Bar Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          setStoryIndex((prevStoryIndex) => {
            if (prevStoryIndex === stories[0].story.length - 1) {
              return 0;
            }
            return prevStoryIndex + 1;
          });
          return 0;
        }
        return prevProgress + 1;
      });
    }, 100);
    if (storyIndex === stories[0].story.length - 1 && progress === 100) {
      dispatch(navigateToPreviousScreen());
    }
    return () => clearInterval(interval);
  }, [progress]);

  const currentStory = stories[0].story[storyIndex];

  const handleStoryLike = () => {
    const story = currentStory;
    const storyIndex = stories[0].story.findIndex((s) => s.storyid === story.storyid);
    const storyLiked = story.liked.find((l) => l.username === logedInUser.username);
    if (storyLiked) {
      story.liked = story.liked.filter((l) => l.username !== logedInUser.username);
    } else {
      story.liked.push({
        username: logedInUser.username,
      });
    }
    const newStories = stories;
    newStories[0].story[storyIndex] = story;
    setStories([...newStories]);
    console.log(stories);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-900 relative">
      {/* Story Image */}
      <img src={currentStory.image} alt="story" className="w-full h-full object-cover" />
      {/* Story Overlay bottom */}
      <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black opacity-50" />
      <div className="absolute bottom-0 w-full z-10 flex flex-col items-start justify-between gap-2 px-4 py-2">
        {/* Story Author Info */}
        <div className="flex items-center gap-2">
          <img src={stories[0].profilePic} alt="profile" className="w-12 h-12 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-white text-lg font-semibold">{stories[0].username}</span>
            <span className="text-gray-400 text-sm">
              {currentStory.location} <span className="text-gray-300">{currentStory.time}</span>
            </span>
          </div>
        </div>

        {/* Story Description */}
        <div className="w-10/12">
          <p className="text-white text-sm">{stories[0].name}. {currentStory.description.slice(0, 100)}...</p>
        </div>
      </div>

      {/* Heart and Share Buttons */}
      <div className="absolute right-5 bottom-32 z-10 flex flex-col gap-5 px-4 py-2">
        <div className="flex items-center gap-2">
          {
            currentStory.liked.find((like) => like.username === logedInUser.username) ? (
              <AiFillHeart className="text-red-500 text-3xl" onClick={handleStoryLike} />
            ) : (
              <AiOutlineHeart className="text-white text-3xl" onClick={handleStoryLike} />
            )
          }
        </div>
        <FaShare className="text-white text-3xl" />
      </div>

      {/* Progress Bar */}
      <div
       className="top-0 bg-sky-500 h-1 absolute z-50"
       style={{ width: `${progress}%` }} />

      {/* Back Button */}
      <div className="absolute top-5 left-2 m-2 z-50 cursor-pointer">
        <IoIosArrowRoundBack className="text-5xl text-white" onClick={() => dispatch(navigateToPreviousScreen())} />
      </div>
    </div>
  );
}
