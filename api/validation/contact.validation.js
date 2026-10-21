const Joi = require("joi");

const addContactSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    email: Joi.string().trim().email().max(100).required(),
    phone: Joi.number().integer().min(1000000).max(999999999999999).required(),
    subject: Joi.string().trim().min(1).max(200).required(),
    message: Joi.string().trim().min(1).max(2000).required()
}).required();

module.exports = { addContactSchema };
