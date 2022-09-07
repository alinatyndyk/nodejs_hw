const {isObjectIdOrHexString} = require("mongoose");
const {ApiError} = require("../errors");
const {userService} = require("../services");

module.exports = {

    checkValidId: (fieldName, from = 'params') => async (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req[from][fieldName])) {
                return next(new ApiError('ID is not valid', 400));
            }
            next();

        } catch (e) {
            next(e);
        }
    }
}
