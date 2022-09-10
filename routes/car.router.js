const {Router} = require('express');

const carController = require('../controllers/car.controller');
const {carMldwr, commonMldwr, userMldwr, authMldwr} = require('../middlewares');
const {newUserValidator} = require("../validators/user.validators");
const {newCarValidator} = require("../validators/car.validators");

const carRouter = Router();

carRouter.post('/',
    commonMldwr.checkValidBody(newCarValidator),
    authMldwr.checkIsAccessTokenValid,
    carController.createCar)

carRouter.get('/:carId',
    commonMldwr.checkValidId('carId'),
    carMldwr.isCarPresent,
    carController.getOneById)

carRouter.delete('/:carId',
    commonMldwr.checkValidId('carId'),
    authMldwr.checkIsAccessTokenValid,
    carMldwr.isCarPresent,
    carController.deleteCarById)

carRouter.put('/:carId',
    commonMldwr.checkValidId('carId'),
    commonMldwr.checkValidBody(newCarValidator),
    authMldwr.checkIsAccessTokenValid,
    carMldwr.isCarPresent,
    carController.updateCarById)

module.exports = carRouter;