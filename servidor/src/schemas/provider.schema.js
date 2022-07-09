const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const ruc=Joi.string();
const description=Joi.string();
const image = Joi.string().uri();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const createProviderSchema = Joi.object({
  name: name.required(),
  ruc:ruc.required()
});

const updateProviderSchema = Joi.object({
  name: name.required(),
  ruc:ruc.required()
});

const getProviderSchema = Joi.object({
  id: id.required(),
});
// const queryCategoriesSchema = Joi.object({
//   limit,
//   offset
//    // price_max:price_max.when('price_min',{
//   //   is:Joi.number().integer(),
//   //   then:Joi.required()
//   // })
// });
module.exports = { createProviderSchema, updateProviderSchema, getProviderSchema}
