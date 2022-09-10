const Joi = require("joi");

const {IDValidator} = require("./common.validators");


const modelValidator = Joi.string().alphanum().min(2).max(35).trim();
const yearValidator = Joi.number().integer().min(1900).max(new Date().getFullYear());

const newCarValidator = Joi.object({
    year: yearValidator.required(),
    model: modelValidator.required()

})

const updateCarValidator = Joi.object({
    year: yearValidator,
    model: modelValidator
})

module.exports = {
    newCarValidator,
    updateCarValidator
}