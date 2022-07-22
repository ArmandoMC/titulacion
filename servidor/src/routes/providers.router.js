const express = require('express');
const passport = require('passport');

const ProviderService = require('../services/providers.service');
const validatorHandler = require('../middlewares/validator.handler');
// const {checkRoles} = require('../middlewares/auth.handler');
const{createProviderSchema,updateProviderSchema,getProviderSchema}=require('../schemas/provider.schema');

const router = express.Router();
const service = new ProviderService();

router.get('/',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const providers = await service.find();
    res.json(providers);
  } catch (error) {
    next(error);
  }
});
router.get('/count',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const count = await service.findCount();
    res.json(count);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller','customer'),

  // validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  // passport.authenticate('jwt', { session: false }),
  // checkRoles('admin'),
  validatorHandler(createProviderSchema, 'body'),
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

  validatorHandler(getProviderSchema, 'params'),
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
  validatorHandler(getProviderSchema, 'params'),
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
