const Joi = require('joi');

const customerRegisterValidateSchema = Joi.object({
    id: Joi.string().min(3).max(30).pattern(new RegExp('^[a-z0-9]*$')).required(),
    name: Joi.string().min(3).max(20).pattern(new RegExp('^[가-힣]*$')).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-z0-9]*$')).required(),
    passwordCheck: Joi.ref('password'),
});

const driverRegisterValidateSchema = Joi.object({
    id: Joi.string().min(3).max(30).pattern(new RegExp('^[a-z0-9]*$')).required(),
    name: Joi.string().min(3).max(20).pattern(new RegExp('^[가-힣]*$')).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-z0-9]*$')).required(),
    passwordCheck: Joi.ref('password'),
    image: Joi.string().required(),
});

const driverIdValidateSchema = Joi.number().required();

module.exports = {
    customerRegisterValidateSchema,
    driverRegisterValidateSchema,
    driverIdValidateSchema,
};
