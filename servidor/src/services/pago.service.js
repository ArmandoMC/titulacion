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
    const{customer_id,address_id,total,token,name}=data;
    const responseMethod = await this.generatePaymentMethod(token) //TODO: 🔴 Token magico!
    const resPaymentIntent = await this.generatePaymentIntent(
      {
        amount: total,
        user: name,
        payment_method: responseMethod.id
      }
    )

    const query = {
      text: `INSERT INTO orders(customer_id,address_id,total,id_transaccion) VALUES($1,$2,$3,$4) RETURNING *`,
      values: [customer_id,address_id,total,resPaymentIntent.id]
    };

    const order = await this.pool.query(query);
    console.log('order:', order.rows[0])
    if (order.rows.length === 0) {
      throw boom.notFound('error al crear orden');
    }

    return {data:order.rows[0],resPaymentIntent};
  }
  async createDetail(id,data) {
    // const{customer_id,address_id,total,status,token,name}=data;
   let query;
    for(let i=0;i<data.length;i++) {
      query = {
        text: `INSERT INTO orders_products(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *`,
        values: [id,data[i].id,data[i].oferta]
      };
      let orderDetail = await this.pool.query(query);
      console.log('detalle de orden',orderDetail.rows)
    };
     

    // console.log('detalle de orden:', orderDetail.rows)
    // if (order.rows.length === 0) {
    //   throw boom.notFound('error al crear orden');
    // }

    return {message:'Detalle de orden registrado con éxito'};
  }
    async updateIdVenta(order,venta){
      const{id}=order.data;
      console.log('id: ',id);
      const{id_sale}=venta;
      console.log('id_sale:',id_sale)
      const query =
      {
        text: `UPDATE orders SET sale_id=$1 WHERE id=${id} RETURNING *`,
        values: [id_sale]
      };
      const newOrder = await this.pool.query(query);

      if (newOrder.rows.length === 0) {
        throw boom.notFound('no se pudo actualizar idVenta en la orden');
      }
      console.log('ide de vent actulizado en la orden:', newOrder.rows[0])
      return newOrder.rows[0];
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
  }
  async findCountPendings() {

    const query = {
      text: `SELECT count(*) FROM orders WHERE status='Preparando tu pedido'`
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }
  async findCountOnTheway() {

    const query = {
      text: `SELECT count(*) FROM orders WHERE status='Pedido en camino'`
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }
  async findCountCompleted() {

    const query = {
      text: `SELECT count(*) FROM orders WHERE status='Pedido entregado'`
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }
  
  async findDetail(id) {
    const query = {
      text:`SELECT op.order_id,op.product_id,op.quantity,p.name,p.presentation,p.price FROM orders_products op INNER JOIN products p ON op.product_id=p.id WHERE op.order_id=$1 `,
      values:[id]
    };
    const orders = await this.pool.query(query);
    console.log('backend:',orders.rows)
    return orders.rows;
  }

  async findOne(id) {
    const query =
    {
      text: `SELECT ord.id,ord.total,ord.status,ord.created_at,ord.sale_id,ad.address,c.name,c.dni,c.phone,us.email,s.num_factura FROM orders ord INNER JOIN customers c ON ord.customer_id=c.id 
      INNER JOIN users us On c.user_id=us.id
      INNER JOIN address ad ON ord.address_id=ad.id INNER JOIN sales s ON ord.sale_id=s.id_sale WHERE ord.id=$1`,
      values: [id]
    };
    const order = await this.pool.query(query);
    if (order.rows.length === 0) {
      throw boom.notFound('orden not found');
    }
    return order.rows[0];
  }
  async findPending() {
    const status='Preparando tu pedido';
    const query =
    {
      text: `SELECT ord.id,ord.customer_id,ord.total,ord.id_transaccion,ord.status,ord.created_at, c.name FROM orders ord INNER JOIN customers c ON ord.customer_id=c.id WHERE ord.status=$1`,
      values:[status]
    };
    const orders = await this.pool.query(query);
    if (orders.rows.length === 0) {
      return [];
    }
    return orders.rows;
  }
  async findOneForUpdateStatus(id,status) {
    const query =
    {
      text: `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`,
      values:[status,id]
    };
    const orders = await this.pool.query(query);
    if (orders.rows.length === 0) {
      return [];
    }
    return orders.rows[0];
  }
  async findCompleted() {
    const status='Pedido entregado';
    const query =
    {
      text:  `SELECT ord.id,ord.customer_id,ord.total,ord.id_transaccion,ord.status,ord.created_at, c.name FROM orders ord INNER JOIN customers c ON ord.customer_id=c.id WHERE ord.status=$1`,
      values:[status]
    };
    const orders = await this.pool.query(query);
    if (orders.rows.length === 0) {
      // throw boom.notFound('orden not found');
      return [];

    }
    return orders.rows;
  }
  
  async findOnTheWay() {
    const status='Pedido en camino';
    const query =
    {
      text:  `SELECT ord.id,ord.customer_id,ord.total,ord.id_transaccion,ord.status,ord.created_at, c.name FROM orders ord INNER JOIN customers c ON ord.customer_id=c.id WHERE ord.status=$1`,
      values:[status]
    };
    const orders = await this.pool.query(query);
    if (orders.rows.length === 0) {
      // throw boom.notFound('orden not found');
      return [];

    }
    return orders.rows;
  }
  
  async findOrdersByCustomer(id) {
    const query =
    {
      text: `SELECT * FROM orders WHERE customer_id=$1`,
      values: [id]
    };
    const order = await this.pool.query(query);
    if (order.rows.length === 0) {
      // throw boom.notFound('no hay ordenes para el cliente');
      return [];

    }
    return order.rows;
  }
  async findAddressByOrderId(id) {
    const query =
    {
      text: `SELECT * FROM address WHERE id=$1`,
      values: [id]
    };
    const order = await this.pool.query(query);
    if (order.rows.length === 0) {
      throw boom.notFound('no hay direccione para el cliente');
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
  async updateConfirmation(id, confirmation) {
    console.log('bienvenido al metodo de updtae status')
   
    const query = {
      text: `UPDATE orders SET confirmation=$1 WHERE id=$2 RETURNING *`,
      values: [confirmation, id]
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
    const resPaymentIntent = await this.generatePaymentIntent(
      {
        amount: resOrder.amount,
        user: resOrder.name,
        payment_method: responseMethod.id
      }
    )
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

  async checkItem(id,confirmation) {
    try {
      console.log('bienvenido a metodo checkItem')
      //TODO: Buscamos orden en nuestra base de datos
     await this.findOne(id)
      //TODO: Solicitamos a stripe que nos devuelva la informacion de la orden
      // const status = detailStripe.status.includes('succe') ? 'success' : 'pendiente';
      //TODO: Actualizamos nuestra orden con el estatus
      // await orders.findOneAndUpdate({ localizator: id }, { status })
      const orden=await this.updateConfirmation(id, confirmation);
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
