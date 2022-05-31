const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema');
const multer = require('../utils/multer');
const fs = require('fs-extra');
const router = express.Router();
const service = new ProductsService();
const cloudinary = require('cloudinary');
const  Producto=require('../models/product.model')

router.get('/',
  validatorHandler(queryProductSchema, 'query'),

  async (req, res, next) => {
    try {

      const products = await service.find(req.query);
      // console.log(products[1].selling_price);
      
      res.json(products);

    } catch (error) {
      next(error);
    }
  });

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      // if (req.file) {
        // const result = await cloudinary.v2.uploader.upload(req.file.path);
        const { name, description, sleeveColor, flavor, presentation, packaging, stock,
          wholesalePrice, sellingPrice, image,publicId,categoryId, brandId, statusId } = req.body;

        const newProduct = {
          name, description, sleeveColor, flavor, presentation, packaging, stock,
          wholesalePrice, sellingPrice, image, publicId, categoryId, brandId, statusId
        };
        const pro = await service.create(newProduct);
        // await fs.unlink(req.file.path);
        console.log(pro);
        res.status(201).json(pro);
      // }

    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.put('/updateImage/:id',
  validatorHandler(getProductSchema, 'params'),
  // validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.updateImagen(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
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
