const boom = require('@hapi/boom');
// const { models } = require('../libs/sequelize');
const pool = require('../libs/postgres.pool');
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51L6P6aKmdXkslfCmglTlBmCmNPVbu9nJcrPDQNHJiQZ1fe4LbPA9Jgqw9xsfGiGimEdZ8X2AEFBTLqGVwKy4krgw006Bdf3YdT');


class PagoService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }
  async create(data) {
    const { name, amount } = data;
    const query = {
      text: `INSERT INTO order_pago(name,amount) VALUES($1,$2) RETURNING *`,
      values: [name, amount]
    };
    const order = await this.pool.query(query);
    console.log('ordern:', order.rows[0])
    if (order.rows.length === 0) {
      throw boom.notFound('error al crear orden');
    }

    return order.rows[0];
  }
  async addItem(data) {
    const { orderId, productId, amount } = data;
    const query = {
      text: `INSERT INTO orders_products(amount,order_id,product_id) VALUES($1,$2,$3) RETURNING *`,
      values: [amount, orderId, productId]
    };
    const newOrder = await this.pool.query(query);
    return newOrder.rows[0];
  }
  async findByUser(userId) {

    const query = {
      text: `SELECT O.id as order_id, C.id,C.name,U.email FROM orders O INNER JOIN customers C ON O.customer_id=C.id
    JOIN users U ON C.user_id=U.id WHERE U.id=$1`,
      values: [userId]
    };

    const rta = await this.pool.query(query);
    return rta.rows;
    // const orders=await models.Order.findAll({
    //   where:{
    //     '$customer.user.id$':userId
    //   },
    //   include:[{
    //     association:'customer',
    //     include:['user']
    //   }]
    // });
    //  return rta;
  }
  async find() {
    const query = 'SELECT * FROM orders';
    const orders = await this.pool.query(query);
    return orders.rows;
  }

  async findOne(id) {
    const query =
    {
      text: `SELECT * FROM order_pago WHERE id=$1`,
      values: [id]
    };
    const order = await this.pool.query(query);
    if (order.rows.length === 0) {
      throw boom.notFound('orden not found');
    }
    return order.rows[0];
  }

  // async getPaymentDetail(id) {
  //   const detailOrder = await stripe.paymentIntents.retrieve(id)
  //   console.log('esto es el detalle de orden', detailOrder)
  //   return detailOrder.rows[0];
  // }

  async updateStripeId(id, resPaymentIntent_id) {
   
    const query = {
      text: `UPDATE order_pago SET stripe_id=$1 WHERE id=$2 RETURNING *`,
      values: [resPaymentIntent_id, id]
    };
    const rta = await pool.query(query);
    console.log('Esta es la respuesta al update stripeId:', rta.rows[0])
    if (rta.rows.length === 0) {
      throw boom.notFound('StripeId de orden no se actualizó');
    }
    
    return rta.rows[0];
  }
  async updateStatus(id, status) {
    console.log('bienvenido al metodo de updtae status')
   
    const query = {
      text: `UPDATE order_pago SET status=$1 WHERE id=$2 RETURNING *`,
      values: [status, id]
    };
    const rta = await pool.query(query);
    console.log('Esta es la respuesta al update status:', rta.rows[0])
    
    if (rta.rows.length === 0) {
      throw boom.notFound('status de orden no se actualizó');
    }
    return rta.rows[0];
  }

  async updateItem(id, token) {
    //TODO: Buscamos orden en nuestra base de datos

    const resOrder = await this.findOne(id);
    //TODO: Generamos metodo de pago en Stripe
    // console.log('orden verificada en bd', resOrder.rows[0])
    const responseMethod = await this.generatePaymentMethod(token) //TODO: 🔴 Token magico!
    //TODO: Generamos intencion de pago
    const resPaymentIntent = await this.generatePaymentIntent(
      {
        amount: resOrder.amount,
        user: resOrder.name,
        payment_method: responseMethod.id
      }
    )
    //TODO: Actualizamos  orden con id de intencion de pago
    // await this.updateStripeId(id,resPaymentIntent.id);

    const query = {
      text: `UPDATE order_pago SET stripe_id=$1 WHERE id=$2 RETURNING *`,
      values: [resPaymentIntent.id, id]
    };
    const rta = await pool.query(query);
    console.log('Esta es la respuesta al update stripeId:', rta.rows[0])
    if (rta.rows.length === 0) {
      throw boom.notFound('StripeId de orden no se actualizó');
    }
    return resPaymentIntent;
  }

  async checkItem(id,status) {
    try {
      console.log('bienvenido a metodo checkItem')
      //TODO: Buscamos orden en nuestra base de datos
     await this.findOne(id)
      //TODO: Solicitamos a stripe que nos devuelva la informacion de la orden
      // const status = detailStripe.status.includes('succe') ? 'success' : 'pendiente';
      //TODO: Actualizamos nuestra orden con el estatus
      // await orders.findOneAndUpdate({ localizator: id }, { status })
      const orden=await this.updateStatus(id, status);
      return orden;
    } catch (e) {
      console.log('error en metodo chehcItem')
    }
  }

  async generatePaymentIntent({ amount, user, payment_method }) {
    const resPaymentIntent = await stripe.paymentIntents.create({
      amount: (amount) * 100,
      currency: 'USD',
      payment_method_types: ['card'],
      payment_method,
      description: `Pago de prueba-> ${user}: Pago`
    });
    return resPaymentIntent;
  }

  generatePaymentMethod = async (token) => {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: { token }
    });
    return paymentMethod;
  }
}

module.exports = PagoService;
