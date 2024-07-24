// books/validators/bookValidator.js
const Joi = require('joi');

const validateBookInput = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        library: Joi.string().required(),
        borrower: Joi.string().optional(),
        coverImage: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports = { validateBookInput };
