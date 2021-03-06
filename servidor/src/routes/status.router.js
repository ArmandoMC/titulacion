const express = require('express');
const passport = require('passport');

const StatusService = require('../services/status.service');
const validatorHandler = require('../middlewares/validator.handler');
const {checkRoles} = require('../middlewares/auth.handler');


const router = express.Router();
const service = new StatusService();

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





router.delete('/:id',
// checkRoles('admin','seller'),
  // validatorHandler(getCategorySchema, 'params'),
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
