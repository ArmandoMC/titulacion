const express = require('express');
const passport = require('passport');
const stripe = require('stripe')('pk_test_51L6P6aKmdXkslfCmYQzTMdo90vo1E3jfPBZeYyecej9nXVdYoZMU81Rxt6u9gtlk0jFfZsod6bIn2W00beEMAu4v00YEprAJdx');
const YOUR_DOMAIN = 'http://localhost:4200/home';

const OrderService = require('../services/order.service');
const PagoService = require('../services/pago.service');
const SalesService = require('../services/sales.service');
const AddressService = require('../services/address.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema,createDetailSchema, addItemSchema ,getDetailSchema} = require('../schemas/order.schema');
const { createPagoSchema } = require('../schemas/pago.schema');

const router = express.Router();
const service = new OrderService();
const servicePago=new PagoService();
const serviceSales=new SalesService();
const addressService=new AddressService();

// router.get('/', async (req, res, next) => {
//   try {
//     const orders = await service.find(req.query);
//     res.json(orders);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/',
//   passport.authenticate('jwt', { session: false }),
//   validatorHandler(createOrderSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       // const body = req.body;
//       const user=req.user;
//       // console.log(body);
//       // const newOrder = await service.create(body);

//       const newOrder = await service.create(user.sub);
//       res.status(201).json(newOrder);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.post('/',
//   // passport.authenticate('jwt', { session: false }),
//   // validatorHandler(createOrderSchema, 'body'),
//   async (req, res, next) => {
//     try {
        
//       const result=await servicePago.create(req.body)
      
//       res.status(201).json(result);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
router.post('/',
  // passport.authenticate('jwt', { session: false }),
  // validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
        console.log('req.body:',req.body);
      const order=await servicePago.create(req.body);
      const venta=await serviceSales.createVenta(order.data);
      // const id_venta=venta.id;
      // console.log('ventaaaaaaaaaa',venta.id)
      await servicePago.updateIdVenta(order,venta);

      // console.log('result combinado',result)
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/detail/:id',
  // passport.authenticate('jwt', { session: false }),
  // validatorHandler(getDetailSchema, 'params'),
  // validatorHandler(createDetailSchema, 'body'),
  async (req, res, next) => {
    try {
      const{id}=req.params;
      console.log('id de order recibido:',id)
        console.log('req.body recibido:',req.body);

      
      const result=await servicePago.createDetail(id,req.body)
      console.log('resultado',result)
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/detail/:id',
  // passport.authenticate('jwt', { session: false }),
  // validatorHandler(getDetailSchema, 'params'),
  // validatorHandler(createDetailSchema, 'body'),
  async (req, res, next) => {
    try {
      const{id}=req.params;
      console.log('id de order recibido:',id)
      
      const result=await servicePago.find(id)
      console.log('resultado',result)
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// router.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '34',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });
//   console.log('lalalalallalal')

//   res.redirect(303, session.url);
// });
router.get('/pending',
  // validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      // const { id } = req.params;
      const orders = await servicePago.findPending();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/:id',
  // validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await servicePago.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/customer/:id',
  // validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log('id de customer:',id)
      const orders = await servicePago.findOrdersByCustomer(id);
      // const or=await addressService.findOne(id)
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);
router.get('/address/:id',
  // validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log('id de customer:',id)
      const orders = await servicePago.findAddressByOrderId(id);
      // const or=await addressService.findOne(id)
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
  // validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {token}=req.body;
      console.log('id y token en router.put:',id,"**",token)
      const respuestaPagoIntento = await servicePago.updateItem(id,token);
      // console.log('respuesta intento pago',respuestaPagoIntento)
      res.json(respuestaPagoIntento);
    } catch (error) {
      next(error);
    }
  }
);


// router.put('/confirm/:id',
//   // validatorHandler(addItemSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const {id} = req.params;
//       const {status}=req.body;
//       console.log('item recibido en ruta',id,"y status recibod:",status)
//       const orderConfirmada = await servicePago.checkItem(id,status);
     
//       console.log('(orden):',orderConfirmada)
//       res.status(201).json(orderConfirmada);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.put('/confirm/:id',
  // validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const {status}=req.body;
      console.log('item recibido en ruta',id,"y status recibod:",status)
      const orderConfirmada = await servicePago.checkItem(id,status);
     
      console.log('(orden):',orderConfirmada)
      res.status(201).json(orderConfirmada);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
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
