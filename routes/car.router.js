const {Router} = require('express');

const carController = require('../controllers/car.controller');
const {carMldwr, commonMldwr, userMldwr, authMldwr} = require('../middlewares');

const carRouter = Router();

carRouter.post('/',
    commonMldwr.checkValidId('userId', 'query'),
    carMldwr.checkValidCarBody,
    authMldwr.checkIsAccessTokenValid,
    userMldwr.isUserPresent('query'),
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
    authMldwr.checkIsAccessTokenValid,
    carMldwr.isCarPresent,
    carController.updateCarById)

module.exports = carRouter;