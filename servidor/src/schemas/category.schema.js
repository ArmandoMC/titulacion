const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const description=Joi.string();
const image = Joi.string().uri();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const createCategorySchema = Joi.object({
  name: name.required(),
  description:description.required()
});

const updateCategorySchema = Joi.object({
  name: name.required(),
  description:description.required()
});

const getCategorySchema = Joi.object({
  id: id.required(),
});
const queryCategoriesSchema = Joi.object({
  limit,
  offset
   // price_max:price_max.when('price_min',{
  //   is:Joi.number().integer(),
  //   then:Joi.required()
  // })
});
module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema ,queryCategoriesSchema}
