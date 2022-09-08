const Joi = require('joi');

const {EMAIL, PASS} = require("../constants/regex.enum");
const {IDValidator} = require("./common.validators");
const {ApiError} = require("../errors");

const newUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(35).trim().required(),
    age: Joi.number().integer().min(1).max(120),
    email: Joi.string().regex(EMAIL).lowercase().trim().required().error(new ApiError('Email not valid', 400)),
    password: Joi.string().regex(PASS).required().error(new ApiError('Password not valid')),
    cars: Joi.array().items(IDValidator)
})

module.exports = {
    newUserValidator
}