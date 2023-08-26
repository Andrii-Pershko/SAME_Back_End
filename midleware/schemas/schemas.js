const Joi = require("joi");

const newUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  state: Joi.string().required(),
});

const roleSchema = Joi.string().valid("Admin", "User").required();

const idSchema = Joi.string().required();

const updateSchema = Joi.object({
  user: Joi.object()
    .keys({
      username: Joi.string(),
      email: Joi.string(),
      role: Joi.string(),
    })
    .unknown(false),
  profile: Joi.object()
    .keys({
      firstname: Joi.string(),
      lastname: Joi.string(),
      state: Joi.string().valid("Male", "Female", "Other"),
    })
    .unknown(false),
}).min(1);

module.exports = { newUserSchema, roleSchema, idSchema, updateSchema };
