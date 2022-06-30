const express = require('express');

const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateCustomerSchema, createCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');


const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.findAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findClientByUser(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log('body de customer:', body)
      const newCustomer = await service.create(body);
      console.log('customer creado:',newCustomer)
      res.status(201).json(newCustomer);
    } catch (error) {
      console.log('hubo un error');
      next(error);
    }
  }
);
router.post('/by-admin',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log('body de customer:', body)
      const newCustomerWithUser = await service.createByAdmin(body);
      
      // console.log('customer creado:',newCustomerWithUser)
      res.status(201).json(newCustomerWithUser);
    } catch (error) {
      console.log('hubo un error');
      next(error);
    }
  }
);

router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  // validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update2(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);
router.put('/updateDniAndPhone/:id',
  validatorHandler(getCustomerSchema, 'params'),
  // validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.updateDniAndPhone(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/nombreCompleto/:id',
  validatorHandler(getCustomerSchema, 'params'),
  // validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.updateNombreCompleto(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/updateDni/:id',
  validatorHandler(getCustomerSchema, 'params'),
  // validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.updateDni(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/updatePhone/:id',
  validatorHandler(getCustomerSchema, 'params'),
  // validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.updatePhone(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
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

