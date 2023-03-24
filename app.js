const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser')
const cardRouter = require('./routes/cards')
const userRouter = require('./routes/users');
const pageNotFoundRouter = require('./routes/pagenotfound')
const app = express();
const { PORT = 3000, BASE_PATH = "http://localhost" } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  family: 4
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '641d9cc03e076c3f7fa643f8'
  }
  next()
})

app.use('/', userRouter)
app.use('/', cardRouter)
app.use('/', pageNotFoundRouter)


app.listen(PORT, () => {
  console.log(`Сервер : ${BASE_PATH}:${PORT}`)
});

