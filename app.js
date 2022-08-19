const express = require('express');
// const users = require('./dataBase');
const fileService = require('./services/file.service')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Request processed');

    res.json('Hello world')
})

app.get('/users', async (req, res) => {
    const usersFromService = await fileService.getUsers();
    res.json(usersFromService)
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params

    if (Number.isNaN(userId) || userId < 0) {
        res.status(400).json('Wrong userId');
        return;
    }

    const user = await fileService.getUserById(+userId)

    if (!user) {
        res.status(404).json('User not found')
    }

    res.json(user)
})


app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params

    if (Number.isNaN(userId) || userId < 0) {
        res.status(400).json('Wrong userId');
        return;
    }

    const user = await fileService.deleteById(+userId)

    if (!user) {
        res.status(404).json('User not found')
    }

    res.sendStatus(204)
})


app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const {age, name} = req.body

    if (Number.isNaN(userId) || userId < 0) {
        res.status(400).json('Wrong userId');
        return;
    }

    const userData = {};
    if (age) userData.age = age;
    if (name) userData.name = name;

    const user = await fileService.updateById(+userId, req.body)

    if (!user) {
        res.status(404).json('User not found')
    }

    res.status(201).json(user)
})


app.post('/users', async (req, res) => {
    const {age, name} = req.body;

    console.log(age, 'age')
    console.log(name, 'name')

    if (Number.isNaN(age) || age < 0) {
        res.status(400).json('Wrong user age');
        return;
    }

    const user = await fileService.insertUser({age, name});

    res.status(201).json(user)
})

app.listen(5000, () => {
    console.log('app server 5000')
})