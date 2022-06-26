const Joi = require('joi');

const id = Joi.number().integer();
const address = Joi.string();
const city = Joi.string();
const state = Joi.string();
const country = Joi.string();
const postal_code=Joi.string();
const user_id=Joi.number().integer();

const getAddressSchema = Joi.object({
  id: id.required(),
});


const createAddressSchema = Joi.object({
  address:address.required(),
  city:city.required(),
  state:state.required(),
  country:country.required(),
  postal_code:postal_code.required(),
  user_id:user_id.required()
});

const updateAddressSchema=Joi.object({
  address:address.required(),
  city:city.required(),
  state:state.required(),
  country:country.required(),
  postal_code:postal_code.required(),
  user_id:user_id.required()
})



module.exports = { createAddressSchema, updateAddressSchema ,getAddressSchema}

