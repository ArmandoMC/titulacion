const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(50);
const description=Joi.string();
const sleeveColor=Joi.string();
const flavor=Joi.string();
const presentation=Joi.string();
const packaging=Joi.string();
const stock=Joi.number().integer();
const wholesalePrice = Joi.number().integer();
const sellingPrice = Joi.number().integer();
const image = Joi.string();
const publicId=Joi.string();
const categoryId = Joi.number().integer();
const brandId = Joi.number().integer();
const statusId = Joi.number().integer();

const create_at=Joi.date().timestamp();
const price=Joi.number().precision(2);

const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createProductSchema = Joi.object({
  name: name.required(),
  description:description.required(),
  price,
  sleeveColor,
  flavor,
  presentation:presentation.required(),
  packaging:packaging.required(),
  stock:stock.required(),
  wholesalePrice:wholesalePrice.required(),
  sellingPrice:sellingPrice.required(),
  image:image.required(),
  publicId:publicId.required(),
  categoryId: categoryId.required(),
  brandId:brandId.required(),
  statusId:statusId.required()
});

const updateProductSchema = Joi.object({
  // name: name,
  image: image,
  // description,
  // price: price,
  // categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  // sellingPrice,
  // price_min,
  // price_max:price_max.when('price_min',{
  //   is:Joi.number().integer(),
  //   then:Joi.required()
  // })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema,queryProductSchema }
