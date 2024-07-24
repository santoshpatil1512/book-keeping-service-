// borrowing/validators/borrowValidator.js
const Joi = require('joi');

const validateBorrowRequest = (data) => {
    const schema = Joi.object({
        bookId: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports = { validateBorrowRequest };
