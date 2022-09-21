const {carService, userService} = require("../services");

module.exports = {

    getOneById: async (req, res, next) => {
        try {
            const {car} = req;

            //  const {carId} = req.params;
            // const car = await carService.getOneById(carId);
            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo.user;
            const car = await carService.createCar({...req.body, user: _id});
            console.log('car controller', car);
            const userCars = await carService.getCarsByParams({user: _id});
            await userService.updateUserById(_id, {cars: [...userCars, car._id]});
            console.log(userCars, 'userCars carController')
            res.status(201).json(car)
        } catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {
            const {carId} = req.params

            await carService.deleteCarById(carId);

            res.sendStatus(204)

        } catch (e) {
            next(e);
        }
    },

    updateCarById: async (req, res, next) => {
        try {
            const {carId} = req.params;

            const car = await carService.updateCarById(carId, req.body);
            // const carBody = await carService.getOneById(carId);

            res.status(201).json(car);

        } catch (e) {
            next(e);
        }
    }
}