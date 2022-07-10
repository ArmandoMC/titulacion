const express = require('express');

const productsRouter = require('./products.router');
const customerRouter = require('./customer.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const subcategoriesRouter = require('./subcategories.router');
const ordersRouter = require('./orders.router');
const brandsRouter = require('./brands.router');
const statusRouter = require('./status.router');

const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const addressRouter = require('./address.router');
const providerRouter = require('./providers.router');

function routerApi(app) {

  const router = express.Router();
  app.use('/api', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoriesRouter);
  router.use('/subcategories', subcategoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/profile', profileRouter);
  router.use('/auth', authRouter);
  router.use('/address', addressRouter);
  router.use('/brands', brandsRouter);
  router.use('/status', statusRouter);
  router.use('/providers', providerRouter);

}

module.exports = routerApi;
