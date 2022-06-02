const express = require('express');

const AddressService = require('../services/address.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new AddressService();

router.get('/', async (req, res, next) => {
  try {
    const address = await service.find();
    res.json(address);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const address = await service.findOne(id);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  // validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAddress = await service.create(body);
      res.status(201).json(newAddress);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

