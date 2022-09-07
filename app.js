const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const {userRouter, carRouter, authRouter} = require('./routes/')
const {PORT, MONGO_URL} = require('./configs/config')
const {mainErrHandler} = require("./errors");

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('/auth', authRouter)

// app.use('*', (req, res, next) => {
//     next(new Error('Route not found'));
// });

app.use(mainErrHandler);

app.listen(PORT, () => {
    console.log('app server', PORT);
    mongoose.connect(MONGO_URL).then(()=>{
    console.log('connected to database')
    });
});