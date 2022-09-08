const User = require('../dataBase/User')

module.exports = {
    getAllUsers(filter = {}) {
        return User.find(filter);
    },

    createUser(userObject) {
        return User.create(userObject)
    },

    updateUserById(userId, newUserObject) {
        return User.findOneAndUpdate({_id: userId}, newUserObject, {new: true})
    },

    getUserByParams(filter) {
        return User.findOne(filter);
    },

    getOneById(id) {
        return User.findById(id).select(['+cars']).populate('cars');
    },

    deleteUserById(userId){
        return User.deleteOne({_id: userId})
    }
}