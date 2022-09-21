const {PreviousPassword} = require("../dataBase");



module.exports = {

    savePasswords(oldPassInfo) {
        return PreviousPassword.create(oldPassInfo);
    },

    getByUserId(userId) {
        return PreviousPassword.findOne({user: userId}).lean();
    },

    deleteManyBeforeDate(date) {
        return PreviousPassword.deleteMany({createdAt: {$lt: date}})
    }

}