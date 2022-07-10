const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const description=Joi.string();
const image = Joi.string().uri();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const createSubcategorySchema = Joi.object({
  name: name.required(),
  description:description.required()
});

const updateSubcategorySchema = Joi.object({
  name: name.required(),
  description:description.required()
});

const getSubcategorySchema = Joi.object({
  id: id.required(),
});
const querySubcategoriesSchema = Joi.object({
  limit,
  offset
   // price_max:price_max.when('price_min',{
  //   is:Joi.number().integer(),
  //   then:Joi.required()
  // })
});
module.exports = { createSubcategorySchema, updateSubcategorySchema, getSubcategorySchema ,querySubcategoriesSchema}
