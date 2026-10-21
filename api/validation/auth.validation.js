const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    email: Joi.string().trim().email().max(100).required(),
    password: Joi.string().min(6).max(128).required()
}).required();

const loginSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().required()
}).required();

const updateProfileSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required()
}).required();

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).max(128).required()
}).required();

module.exports = { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema };
