const express = require('express');
const passport = require('passport');
// const {config}=require('../config/config');
// const validatorHandler = require('./../middlewares/validator.handler');
const OrderService = require('./../services/order.service');
const AuthService=require('./../services/auth.service');
const router = express.Router();
const service=new OrderService();
const authService=new AuthService();


router.get('/my-orders',
  passport.authenticate('jwt',{session:false}),
  async (req, res, next) => {
  try {
    const user=req.user;
    const orders=await service.findByUser(user.sub);
    res.json(orders);

  } catch (error) {
    next(error);
  }
});


module.exports = router;
