const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  post: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
