const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT } = require ('./config');
const { BlogPost } = require('./models');

const bprouter = require("./blogPostsRouter");

const app = express();

app.use(morgan("common"));
app.use(express.json());

app.get('/posts', (req, res) => {
  BlogPost
  .find()
  .then(posts => {
    res.json(posts.map(post => post.serialize()));
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'something went wrong.'});
  });
});

app.get('/posts/:id', (req, res) => {
  BlogPost
  .findById(req.params.id)
  .then(post => res.json(post.serialize()))
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'something went wrong wrong wrong'});
  });
});
// you need to import `blogPostsRouter` router and route

// requests to HTTP requests to `/blog-posts` to `blogPostsRouter`
app.use('/blog-posts', bprouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
