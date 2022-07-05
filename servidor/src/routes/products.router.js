const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema');
const multer = require('../utils/multer');
const fs = require('fs-extra');
const router = express.Router();
const service = new ProductsService();
const cloudinary = require('cloudinary');
const Producto = require('../models/product.model')

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

router.get('/ultimoId',
  // validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const product = await service.findUltimoId();
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
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
  // validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      // if (req.file) {
      // if(req.file){
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      if (result != null) {
        console.log(result)
        const { name, description, sleeve_color, flavor, presentation, packaging, stock,
          purchase_price, price, category_id, brand, provider_id } = req.body;
        const newProduct = {
          name, description, sleeve_color, flavor, presentation, packaging, stock,
          purchase_price, price, image: result.url, public_id: result.public_id, category_id, brand, provider_id
        };
        const pro = await service.create(newProduct);
        await fs.unlink(req.file.path);
        console.log(pro);
        res.status(201).json(pro);
      }
      return { message: 'Error al obtener datos del frontend' }

      // }

      // const { name, description, sleeveColor, flavor, presentation, packaging, stock,
      //   wholesalePrice, sellingPrice, image,publicId,categoryId, brandId, statusId } = req.body;


      // }

    } catch (error) {
      next(error);
    }
  }
);


router.put('/updateStock',
  // validatorHandler(getProductSchema, 'params'),
  // validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      // const { id } = req.body;
      const body = req.body;
      console.log('vector de products :', body)
      const product = await service.updateStock(req.body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  // validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const{hayFoto}=req.body;
      if(hayFoto==='No'){
        const { name, description, sleeve_color, flavor, presentation, packaging, stock,
          purchase_price, price, category_id, brand, provider_id,image_url,public_id } = req.body;
        const newProduct2 = {
          name, description, sleeve_color, flavor, presentation, packaging, stock,
          purchase_price, price, image: image_url, public_id, category_id, brand, provider_id
        };
        const product = await service.update(id, newProduct2);
        res.json(product);
      }else{
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const { name, description, sleeve_color, flavor, presentation, packaging, stock,
          purchase_price, price, category_id, brand, provider_id } = req.body;
        const newProduct = {
          name, description, sleeve_color, flavor, presentation, packaging, stock,
          purchase_price, price, image: result.url, public_id: result.public_id, category_id, brand, provider_id
        };
        const product = await service.update(id, newProduct);

        res.json(product);
      }

      // if (req.file.path) {
       
      // } else {
        
      // }

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
      res.status(201).json(id);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
