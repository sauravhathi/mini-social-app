const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

router.post('/create', async (req, res) => {
  try {
    const { description, isStory, image, tags, location, vibetags, likes } = req.body;
    console.log(req.body);
    const post = new Post({ description, isStory, image, tags, location, vibetags, likes });
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
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;
    const postId = req.params.postId;
    console.log(postId);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post or story not found' });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id != userId);
    } else {
      post.likes.push(userId);
    }
    
    await post.save();
    res.json({ message: 'Post or story liked successfully', post });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while liking the post or story' });
  }
});

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