const express = require('express');

const productsRouter = require('./products.router');
const customerRouter = require('./customer.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const ordersRouter = require('./orders.router');

const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app) {

  const router = express.Router();
  app.use('/api', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/profile', profileRouter);
  router.use('/auth', authRouter);

}

module.exports = routerApi;
