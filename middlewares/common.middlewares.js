const {isObjectIdOrHexString} = require("mongoose");
const {ApiError} = require("../errors");

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
    },

    checkValidBody: (validatorType) => async (req, res, next) => {
        try {
            const validate = validatorType.validate(req.body)
            if (validate.error) {
                return next(new ApiError(`${validate.error}`, 400))
            }
            req.body = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    }
}
