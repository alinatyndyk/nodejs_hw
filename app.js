const express = require('express');
// const users = require('./dataBase');
const fileService = require('./services/file.service')

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    console.log('Request processed');

    res.json('Hello world')
})

app.get('/users', async (req, res)=>{
    const usersFromService = await fileService.getUsers();
    res.json(usersFromService)
})

app.get('/users/:userId', (req, res)=>{
    const {userId} = req.params

    if (Number.isNaN(userId) || userId < 0){
        res.status(400).json('Wrong userId');
        return;
    }

    const user = users[userId];

    if (!user){
        res.status(404).json('User not found')
    }

    res.json(user)
})



app.post('/users', (req, res)=>{
    const {age, name} = req.body;

    console.log(age,'age')
    console.log(name,'name')

    if (Number.isNaN(age) || age < 0){
        res.status(400).json('Wrong user age');
        return;
    }

    users.push({name, age})

    res.status(201).json('ok')
})

app.listen(5000, ()=>{
    console.log('app server 5000')
})