const Joi = require('joi');

const contactsJoinSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = contactsJoinSchema;
