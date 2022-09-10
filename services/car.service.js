const { Car } = require('../dataBase')

module.exports = {

    createCar(carObject) {
        return Car.create(carObject)
    },

    updateCarById(carId, newCarObject) {
        return Car.updateOne({_id: carId}, newCarObject, {new: true})
    },

    getCarsByParams(filter) {
        return Car.find(filter);
    },

    getOneById(id) {
        return Car.findById(id).populate('user');
    },

    deleteCarById(carId){
        return Car.deleteOne({_id: carId})
    }
}