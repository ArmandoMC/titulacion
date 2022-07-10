const express = require('express');
const passport = require('passport');

const BrandService = require('../services/brand.service');
const {createBrandSchema,updateBrandSchema,getBrandSchema} = require('../schemas/brand.schema');
const validatorHandler = require('../middlewares/validator.handler');
const {checkRoles} = require('../middlewares/auth.handler');


const router = express.Router();
const service = new BrandService();

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

router.post('/',
  // passport.authenticate('jwt', { session: false }),
  // checkRoles('admin'),
  validatorHandler(createBrandSchema, 'body'),
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
router.put('/:id',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller','customer'),

  validatorHandler(getBrandSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body=req.body;
      const brand = await service.update(id,body);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
// checkRoles('admin','seller'),
  validatorHandler(getBrandSchema, 'params'),
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
