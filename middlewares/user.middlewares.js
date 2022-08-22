const {ApiError} = require("../errors");
module.exports = {

    checkValidUserBody: async (req, res, next) => {
        try {
        const {age, name} = req.body;

        console.log(age, 'age')
        console.log(name, 'name')

        if (Number.isNaN(age) || age < 0) {
            throw new ApiError('Wrong user age. Age has to be a positive number.', 400)
            // res.status(400).json('Wrong user age. Age has to be a positive number.');
            // return;
        }

        if (name.length < 3){
            throw new ApiError('Wrong user name. The name has to be longer than 3 symbols.', 418)

        }
        next();

        }catch (e) {
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



}