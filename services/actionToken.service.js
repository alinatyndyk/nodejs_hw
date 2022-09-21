const {ActionTokens} = require("../dataBase");
module.exports = {
    createActionToken: (dataToInsert) =>{
        return ActionTokens.create(dataToInsert);
    },

    getOneByParamsWithUser: (searchParams) =>{
        return ActionTokens.findOne(searchParams).populate('user');
    },

    deleteOne: (deleteParams) =>{
        return ActionTokens.deleteMany(deleteParams);
    }
}