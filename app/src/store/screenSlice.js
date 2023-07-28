import { createSlice } from '@reduxjs/toolkit';
export const componentMap = {
  Home: 'Home',
  AddPost: 'AddPost',
  CreatePost: 'CreatePost',
  SelectFromGallery: 'SelectFromGallery',
  ImageTool: 'ImageTool',
  PostCreation: 'PostCreation',
  PostViewPost: 'PostViewPost',
  PostViewStory: 'PostViewStory',
};
const initialState = {
  activeScreen: null,
  backStack: [],
  isHeaderVisible: true,
  screenIds: ['home', 'addPost', 'createPost', 'selectFromGallery', 'imageTool', 'postCreation', 'postViewPost', 'postViewStory'],
  screens: [
    { id: 'home', componentId: 'Home' },
    { id: 'addPost', componentId: 'AddPost' },
    { id: 'createPost', componentId: 'CreatePost' },
    { id: 'selectFromGallery', componentId: 'SelectFromGallery' },
    { id: 'imageTool', componentId: 'ImageTool' },
    { id: 'postCreation', componentId: 'PostCreation' },
    { id: 'postViewPost', componentId: 'PostViewPost' },
    { id: 'postViewStory', componentId: 'PostViewStory' },
  ]
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setActiveScreen: (state, action) => {
      const screenId = action.payload;
      console.log(screenId);
      if (state.screenIds.includes(screenId)) {
        state.backStack.push(state.activeScreen);
        state.activeScreen = screenId;
      }
    },
    navigateToPreviousScreen: (state) => {
      if (state.backStack.length > 0) {
        const lastScreenId = state.backStack.pop();
        state.activeScreen = lastScreenId;
      }
    },
    closeActiveScreen: (state) => {
      state.backStack = [];
      state.activeScreen = 'home'
    },
    toggleHeaderVisibility: (state) => {
      state.isHeaderVisible = !state.isHeaderVisible;
    },
  },
});

export const {
  setActiveScreen,
  navigateToPreviousScreen,
  closeActiveScreen,
  toggleHeaderVisibility,
} = screenSlice.actions;
export default screenSlice.reducer;