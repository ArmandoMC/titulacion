const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer(1);
const name=Joi.string();
const localizator=Joi.string();
const stripeId=Joi.string();
const status=Joi.string();
const getOrderSchema = Joi.object({
  id: id.required(),
});


const createPagoSchema = Joi.object({
  name,
  amount,
  localizator,
  stripeId,
  status
});
//esquema para order-product
const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),

});



module.exports = { getOrderSchema, createPagoSchema ,addItemSchema}

