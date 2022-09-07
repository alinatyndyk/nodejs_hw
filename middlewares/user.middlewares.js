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

    checkUniqueUserEmail: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;
            const userByEmail = await userService.getUserByParams({email});


            if (userByEmail && userByEmail._id.toString() !== userId) {
                return next(new ApiError('User with this email already exists', 409));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (from = 'params') => async (req, res, next) => {
        try {
            const {userId} = req[from];
            const user = await userService.getOneById(userId);

            if (!user) {
                return next(new ApiError('User was not found', 400));
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserDynamically: (from = 'body', fieldName = 'userId', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];
            const user = await User.findOne({[dbField]: fieldToSearch})

            if (!user) {
                return next(new ApiError('User was not found', 400));
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }

}