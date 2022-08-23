const {ApiError} = require("../errors");
const {userService} = require("../services");
const User = require('../dataBase/User');

module.exports = {

    checkValidUserBody: async (req, res, next) => {
        try {
            const {age, name} = req.body;

            if (Number.isNaN(age) || age < 0) {
                return next(new ApiError('Wrong user age. Age has to be a positive number.', 400));
            }

            if (name.length < 3) {
                return next(new ApiError('Wrong user name. The name has to be longer than 3 symbols.', 418));

            }
            next();

        } catch (e) {
            next(e);
        }
    },

    checkValidUserId: async (req, res, next) => {
        const {userId} = req.params;

        if (Number.isNaN(userId) || userId < 0) {
            throw new ApiError('Wrong userId. Try using a positive number.', 400)
        }
        next();
    },

    checkUniqueUserEmail: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = userService.getUserByParams({email});

            if (userByEmail) {
                return next(new ApiError('Email already exists', 400));
            }

            next();
        } catch (e) {
            next(e);
        }
    }

}