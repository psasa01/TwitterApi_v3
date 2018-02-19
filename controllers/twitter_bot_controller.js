const Post = require('../models/post');

module.exports = {
  greeting(req, res) {
    res.send({
      hi: 'there'
    });
  },

  index(req, res, next) {
    Post.find()
      .then((posts) => {
        res.json(posts);
      })
      .catch(next);
  },

  create(req, res, next) {
    const postProps = req.body;
    Post.create(postProps)
      .then((post) => {
        res.send(post)
      })
      .catch(next);
  },

  delete(req, res, next) {
    const postId = req.params.id;
  
    Post.findByIdAndRemove({
        _id: postId
      })
      .then((post) => {
        res.status(204).send(post)
      })
      .catch(next);
  }


};
