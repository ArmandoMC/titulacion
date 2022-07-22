const express = require('express');
const passport = require('passport');

const SubcategoryService = require('../services/subcategory.service');
const validatorHandler = require('../middlewares/validator.handler');
const {checkRoles} = require('../middlewares/auth.handler');

const { createSubcategorySchema, updateSubcategorySchema, getSubcategorySchema ,querySubcategoriesSchema} = require('../schemas/subcategory.schema');

const router = express.Router();
const service = new SubcategoryService();


router.get('/',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const {id}=req.params;
    const subcategories = await service.findSubCategories();
    res.json(subcategories);
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
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const {id}=req.params;
    const subcategories = await service.findOne(id);
    res.json(subcategories);
  } catch (error) {
    next(error);
  }
});
router.get('/:id/products',
// passport.authenticate('jwt', { session: false }),
// checkRoles('admin','seller'),
async (req, res, next) => {
  try {
    const{id}=req.params;
    const products = await service.findProductsBySubCat(id);
    res.json(products);
  } catch (error) {
    next(error);
  }
});



router.post('/',
  // passport.authenticate('jwt', { session: false }),
  // checkRoles('admin'),
  validatorHandler(createSubcategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSubcategory = await service.create(body);
      res.status(201).json(newSubcategory);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
// checkRoles('admin','seller'),
  validatorHandler(getSubcategorySchema, 'params'),
  validatorHandler(updateSubcategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const subccategory = await service.update(id, body);
      res.json(subccategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
// checkRoles('admin','seller'),
  validatorHandler(getSubcategorySchema, 'params'),
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
