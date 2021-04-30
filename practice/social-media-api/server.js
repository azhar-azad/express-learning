const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const { User, Post } = require('./model.js');
const User = require('./models/user.js');
const Post = require('./models/post.js');
const Comment = require('./models/comment.js');

mongoose.connect('mongodb://localhost/SocialMediaApp_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

// POST create user
app.post('/users', async (req, res) => {
  const newUser = new User({
    name: req.body.name
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// POST create post
app.post('/posts/id/:id', async (req, res) => {
  const _id = req.params.id;
  
  const newPost = new Post({
    title: req.body.title,
    postedBy: _id
  });
  try {
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// POST create comment
app.post('/posts/:postId/comments/:commentId', async (req, res) => {
  const _postId = req.params.postId;
  const commentId = req.params.commentId;
  
  const newComment = new Comment({
    text: req.body.text,
    commentedBy: _
  });
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});

