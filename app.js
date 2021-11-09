const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const userRouter = require('./routes/users');
const aboutInfoRouter = require('./routes/aboutInfo');

dotenv.config();

const url = process.env.CONNECTION_STRING;
const port = process.env.PORT;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on('open', () => {
  console.log('connected...');
});

app.use(express.json());

app.use('/users', userRouter);
app.use('/aboutinfo', aboutInfoRouter);

app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});
