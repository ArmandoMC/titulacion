const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer(1);
const productos=Joi.object();
const getOrderSchema = Joi.object({
  id: id.required(),
});


const createOrderSchema = Joi.object({
  customerId,
});
//esquema para order-product
const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),

});
const getDetailSchema=Joi.object({
  id:id.required()
})
const createDetailSchema=Joi.object({
  productos:productos.required()

})



module.exports = { getOrderSchema, createOrderSchema ,addItemSchema,getDetailSchema,getDetailSchema}

