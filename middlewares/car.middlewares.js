const {ApiError} = require("../errors");
const {carService} = require("../services");

module.exports = {

    checkValidCarBody: async (req, res, next) => {
        try {
            // const {age, name} = req.body;
            //
            // if (Number.isNaN(age) || age < 0) {
            //     return next(new ApiError('Wrong user age. Age has to be a positive number.', 400));
            // }
            //
            // if (name.length < 3) {
            //     return next(new ApiError('Wrong username. The name has to be longer than 3 symbols.', 418));
            //
            // }
            next();

        } catch (e) {
            next(e);
        }
    },


    isCarPresent: async (req, res, next) => {
        try {
            const {carId} = req.params;
            const car = await carService.getOneById(carId);

            if (!car) {
                return next(new ApiError('Car was not found', 400));
            }
            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    }

}