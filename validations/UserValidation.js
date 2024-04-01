const Joi = require('@hapi/joi');

module.exports = {
    user: data =>{
        let schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        return schema.validate(data);
    } 
};