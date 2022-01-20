const express = require('express');
const router = require('./routers');

const app = express();

app.use(express.json()); //this middleware will work on all posts

app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
