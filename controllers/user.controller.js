const {userService, authService} = require("../services");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const usersFromService = await userService.getAllUsers();
            res.json(usersFromService)
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.getOneById(userId);

            res.json(user)
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await authService.hashPassword(req.body.password)
            // const {age, name} = req.body;
            const user = await userService.createUser({...req.body, password: hashPassword});

            res.status(201).json(user)
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params

            await userService.deleteUserById(userId);

            res.sendStatus(204)

        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.updateUserById(userId, req.body);
            const userBody = await userService.getOneById(userId);

            res.status(201).json(userBody);

        } catch (e) {
            next(e);
        }
    }
}