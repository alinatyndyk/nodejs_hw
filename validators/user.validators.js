const Joi = require('joi');

const {EMAIL, PASS} = require("../constants/regex.enum");
const {IDValidator} = require("./common.validators");

const newUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(35).required(),
    age: Joi.number().integer().min(1).max(120),
    email: Joi.string().regex(EMAIL).required(),
    password: Joi.string().regex(PASS).required(),
    cars: Joi.array().items(IDValidator)
})

module.exports = {
    newUserValidator
}