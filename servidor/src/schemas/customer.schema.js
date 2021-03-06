const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const last_name = Joi.string();
const phone=Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const userId = Joi.number().integer();
const role=Joi.string();
const dni=Joi.string();
const createCustomerSchema = Joi.object({
  name: name.required(),
  last_name: last_name.required(),
  dni:dni,
  phone: phone,
  user:Joi.object({
    email:email.required(),
    password:password.required(),
    role:role
  })
});

const updateCustomerSchema = Joi.object({
  name:name.required(),
  last_name:last_name.required(),
  dni:dni.required(),
  phone:phone.required(),
  // userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
