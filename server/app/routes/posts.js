const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Create a new post or story
router.post('/create', async (req, res) => {
  try {
    const { description, isStory, image, tags, location, vibetags, likes } = req.body;
    console.log(req.body);
    const post = new Post({ description, isStory, image, tags, location, vibetags, likes});
    await post.save();
    res.status(201).json({ message: 'Post or story created successfully', post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while creating the post or story' });
  }
});

router.post('/like/:postId', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // Step 2: Verify the Access Token and extract the user ID from the decoded payload
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId; // Assuming the user ID is stored in the "userId" field of the token payload

    // Step 3: Check if the post/story exists
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Step 4: Check if the user has already liked the post
    const hasLiked = post.likes.includes(userId);

    // Step 5: Update the like status
    if (hasLiked) {
      // If the user has already liked the post, remove their like
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      // If the user has not liked the post, add their like
      post.likes.push(userId);
    }

    // Step 6: Save the updated post with the like status
    const updatedPost = await post.save();
    
    console.log(updatedPost);
    // Step 7: Return the updated post with the like status
    res.json({ message: 'Post like status updated successfully', post: updatedPost });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error('Error in liking post:', error);
    res.status(500).json({ message: 'An error occurred while liking the post' });
  }
});

// Fetch a post or story by ID
router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post or story not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the post or story' });
  }
});

router.get('/', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while fetching the posts' });
    }
  });
  
module.exports = router;