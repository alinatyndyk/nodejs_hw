const express = require('express');
require('dotenv').config();

const userRouter = require('./routes/user.router')
const {PORT} = require('./configs/config')

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('app server', PORT)
})