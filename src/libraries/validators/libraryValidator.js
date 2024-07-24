// libraries/validators/libraryValidator.js
const Joi = require('joi');

const validateLibraryInput = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
    });
    return schema.validate(data);
};

module.exports = { validateLibraryInput };
