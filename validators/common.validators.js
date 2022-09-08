import Joi from "joi";
import {MONGO_ID} from "../constants/regex.enum";


const IDValidator = Joi.string().regex(MONGO_ID);
module.exports = {
    IDValidator
};