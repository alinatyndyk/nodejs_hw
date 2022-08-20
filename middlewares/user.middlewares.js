module.exports = {

    checkValidUserBody: async (req, res, next) => {
        const {age, name} = req.body;

        console.log(age, 'age')
        console.log(name, 'name')

        if (Number.isNaN(age) || age < 0) {
            res.status(400).json('Wrong user age');
            return;
        }

        if (name.length < 3){
            res.status(400).json('Wrong user name')
            return;
        }
        next();
    }

}