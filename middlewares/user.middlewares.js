const {ApiError} = require("../errors");
const {userService} = require("../services");
const User = require('../dataBase/User');


module.exports = {


    checkUniqueUserEmail: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;
            const userByEmail = await userService.getUserByParams({email, _id: {$ne: userId}});


            if (userByEmail) {
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