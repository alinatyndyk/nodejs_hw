const Joi = require('joi');

const {EMAIL, PASS} = require("../constants/regex.enum");
const {IDValidator} = require("./common.validators");
const {ApiError} = require("../errors");

const nameValidator = Joi.string().alphanum().min(2).max(35).trim();
const ageValidator = Joi.number().integer().min(1).max(120);
const emailValidator = Joi.string().regex(EMAIL).lowercase().trim().error(new ApiError('Email not valid', 400));
const passValidator = Joi.string().regex(PASS).error(new ApiError('Password not valid'));

const newUserValidator = Joi.object({
    name: nameValidator.required(),
    age: ageValidator,
    email: emailValidator.required(),
    password: passValidator.required(),

})

const updateUserValidator = Joi.object({
    name: nameValidator.required(),
    age: ageValidator,
    email: emailValidator.required(),
    password: passValidator.required(),

})

const loginUserValidator = Joi.object({
    email: emailValidator.required().error(new ApiError('Wrong email or password', 400)),
    password: passValidator.required().error(new ApiError('Wrong email or password', 400))

})

const userEmailValidator = Joi.object({
    email: emailValidator.required().error(new ApiError('Wrong email', 400)),

})

const userPasswordValidator = Joi.object({
    password: passValidator.required().error(new ApiError('Wrong password', 400))

})

module.exports = {
    newUserValidator,
    updateUserValidator,
    loginUserValidator,
    userEmailValidator,
    userPasswordValidator
}

// const updateUserValidator = Joi.object({
//     name: Joi.string().alphanum().min(2).max(35).trim(),
//     age: Joi.number().integer().min(1).max(120),
//     email: Joi.string().regex(EMAIL).lowercase().trim().required().error(new ApiError('Email not valid', 400)),
//
// })

