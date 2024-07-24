// users/validators/userValidator.js
const Joi = require('joi');

const validateRegisterInput = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('Author', 'Borrower').required(),
    });
    return schema.validate(data);
};

const validateLoginInput = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports = { validateRegisterInput, validateLoginInput };
