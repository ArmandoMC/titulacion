const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const {checkRoles} = require('../middlewares/auth.handler');
const MenuService = require('../services/menu.service');


const router = express.Router();
const service = new MenuService();

router.get('/',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const brands = await service.find();
    res.json(brands);
  } catch (error) {
    next(error);
  }
});
router.get('/sugerencias',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const brands = await service.find();
    res.json(brands);
  } catch (error) {
    next(error);
  }
});


router.get('/count',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const brands = await service.findCount();
    res.json(brands);
  } catch (error) {
    next(error);
  }
});
router.get('/nosotros/:id',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const {id}=req.params;
    const brands = await service.findOne(id);
    res.json(brands);
  } catch (error) {
    next(error);
  }
});
router.post('/nosotros',
  // passport.authenticate('jwt', { session: false }),
  // checkRoles('admin'),
  // validatorHandler(createBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);
router.put('/nosotros/:id',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller','customer'),

  // validatorHandler(getBrandSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body=req.body;
      const menu = await service.updateMenuNosotros(id,body);
      res.json(menu);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/nosotros/:id',
// checkRoles('admin','seller'),
  // validatorHandler(getBrandSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
