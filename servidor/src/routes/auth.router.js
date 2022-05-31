const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {config}=require('../config/config');
// const validatorHandler = require('./../middlewares/validator.handler');
const AuthService = require('../services/auth.service');
const service = new AuthService();

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  });

router.post('/recovery',
   //debo crear un schema para validar los datos que me van a enviar
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  });

router.post('/change-password',
  //debo crear un schema para validar los datos como el token y password
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  });

  router.get('/ver-perfil',
  // passport.authenticate('jwt',{session:false}),
  async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user=await service.getProfile(token);
    res.json(user);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
