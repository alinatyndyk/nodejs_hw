module.exports = {

    checkValidUserBody: async (req, res, next) => {
        const {age, name} = req.body;

        console.log(age, 'age')
        console.log(name, 'name')

        if (Number.isNaN(age) || age < 0) {
            res.status(400).json('Wrong user age. Age is supposed to be a positive number.');
            return;
        }

        if (name.length < 3){
            res.status(400).json('Wrong user name. Your name has to be longer than 3 symbols.')
            return;
        }
        next();
    },

    checkValidUserId: async (req, res, next) => {
        const {userId} = req.params;

        if (Number.isNaN(userId) || userId < 0) {
            res.status(400).json('Wrong userId. Try using a positive number.');
            return;
        }
        next();
    },



}