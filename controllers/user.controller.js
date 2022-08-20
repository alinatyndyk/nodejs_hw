const fileService = require("../services/file.service");
module.exports = {
    getAllUsers: async (req, res) => {
        const usersFromService = await fileService.getUsers();
        res.json(usersFromService)
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;
        const user = await fileService.getUserById(+userId)

        if (!user) {
            res.status(404).json('User not found')
        }

        res.json(user)
    },

    createUser: async (req, res) => {
        const {age, name} = req.body;
        const user = await fileService.insertUser({age, name});

        res.status(201).json(user)
    },

    deleteUserById: async (req, res) => {
        const {userId} = req.params

        const user = await fileService.deleteById(+userId)

        if (!user) {
            res.status(404).json('User not found')
        }

        res.sendStatus(204)
    },

    updateUserById: async (req, res) => {
        const {userId} = req.params
        const {age, name} = req.body;

        const userData = {};
        if (age) userData.age = age;
        if (name) userData.name = name;

        const user = await fileService.updateById(+userId, req.body)

        if (!user) {
            res.status(404).json('User not found')
        }

        res.status(201).json(user)
    }
}