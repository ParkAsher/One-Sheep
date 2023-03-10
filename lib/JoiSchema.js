const { string } = require('joi');
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

const orderIdValidateSchema = Joi.number().required();

const orderStatusValidateSchema = Joi.string().required();

const orderRegisterValidateSchema = Joi.object({
    phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(16)
        .required(),
    address: Joi.string().required(),
    request: Joi.string().allow('', null),
    usageDateTimeStart: Joi.date().greater('now').required(),
    usageTime: Joi.number().integer().min(1).max(12).required(),
});

const customerIdValidateSchema = Joi.number().required();

const deductionPointValidateSchema = Joi.object({
    customerId: Joi.number().required(),
    deductionPoint: Joi.number().required(),
});

const loginValidateSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.string().required(),
});

const postReviewsValidateSchema = Joi.object({
    stars: Joi.number().required(),
    content: Joi.string().required(),
});

module.exports = {
    customerRegisterValidateSchema,
    driverRegisterValidateSchema,
    driverIdValidateSchema,
    orderIdValidateSchema,
    orderStatusValidateSchema,
    orderRegisterValidateSchema,
    customerIdValidateSchema,
    deductionPointValidateSchema,
    loginValidateSchema,
    postReviewsValidateSchema,
};
