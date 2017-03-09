const Joi = require ('joi');

const userValidation = {};

userValidation.updateUser = {
  body: {
    name: Joi.string().required(),
    fullname: Joi.string().required(),
    initials: Joi.string().required()
  }
};

module.exports = userValidation