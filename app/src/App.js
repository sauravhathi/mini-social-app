import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveScreen } from './store/screenSlice';
import Auth from './components/Screens/Auth/Auth';
import Home from './Home';
import AddPost from './components/Screens/AddPost';
import CreatePost from './components/Screens/CreatePost';
import SelectFromGallery from './components/Screens/SelectFromGallery';
import ImageTool from './components/Screens/ImageTool/ImageTool';
import PostCreation from './components/Screens/PostCreation/Post';
import PostViewPost from './components/Screens/PostView/PostViewPost';
import PostViewStory from './components/Screens/PostView/PostViewStory';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const activeScreenId = useSelector((state) => state.screen.activeScreen);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (accessToken) {
      dispatch(setActiveScreen('home'));
    }
  }, [accessToken, dispatch]);

  return (
    <main className="bg-gray-100 w-full mx-auto">
      {isAuthenticated || accessToken ? (
      <>
        {activeScreenId === 'home' && <Home />}
        {activeScreenId === 'addPost' && <AddPost />}
        {activeScreenId === 'createPost' && <CreatePost />}
        {activeScreenId === 'selectFromGallery' && <SelectFromGallery />}
        {activeScreenId === 'imageTool' && <ImageTool />}
        {activeScreenId === 'postCreation' && <PostCreation />}
        {activeScreenId === 'postViewPost' && <PostViewPost />}
        {activeScreenId === 'postViewStory' && <PostViewStory />}
      </>
      ) : (
      <Auth />
      )
      }
    </main>
  );
}

export default App;
