const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4001;

const commentsByPostId = {};

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url} - Response Code: ${res.statusCode}`);
  next();
});

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log(`Post Service running at http://localhost:${PORT}`);
});
