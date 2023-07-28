const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  description: { type: String, required: true },
  isStory: { type: Boolean, default: false },
  image: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  location: { type: String },
  vibetags: [{ type: String }],
  date: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Post', postSchema);