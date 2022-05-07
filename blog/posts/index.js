const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;

const posts = {};

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url} - RESPONSE: ${res.statusCode}`);
  next();
});

app.get('/posts', (req, res) => {
  console.log('Post Service: Getting all Posts');
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  // posts.push({ id, title });
  posts[id] = { id: id, title: title };
  res.status(201).send(posts[id]);
});

app.listen(PORT, () => {
  console.log(`Post Service running at http://localhost:${PORT}`);
});
