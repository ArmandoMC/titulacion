// const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const pool = require('../libs/postgres.pool');

class SalesService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }
  async createVenta(data) {
    const status='Pagada';
    const{created_at}=data;
    const statement = {
      text: `INSERT INTO sales(status,created_at) VALUES($1,$2) RETURNING *`,
      values: [status,created_at]
    };
    const newVenta = await this.pool.query(statement);

    if (newVenta.rows.length === 0) {
      throw boom.notFound('no se genero venta');
    }
    
    const venta = newVenta.rows[0];
    console.log('venta creada: ',venta)

    const numFactura='000-000-000000'+venta.id_sale;
    console.log('numero de factura :',numFactura)
    const statement2 = {
      text: `UPDATE sales SET num_factura=$1 WHERE id_sale=${venta.id_sale} RETURNING *`,
      values: [numFactura]
    };
    const updateVenta = await this.pool.query(statement2);
    console.log('venta con num_fact actualizada: ',updateVenta.rows[0])
    return updateVenta.rows[0];
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

    const query = `SELECT O.id as id_orden, C.name,U.email FROM orders O JOIN customers C ON O.customer_id=C.id JOIN users U ON C.user_id=U.id WHERE O.id=${id}`;
    const order = await this.pool.query(query);
    if (order.rows.length === 0) {
      throw boom.notFound('orden not found');
    }
    return order.rows[0];


    // const order = await models.Order.findByPk(id, {
    //   include: [{
    //     association: 'customer',
    //     include: ['user']
    //   }, 'items'
    //   ]
    // });
    // return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    await this.findOne(id);
    const query = {
      text: `DELETE FROM orders WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }

}

module.exports = SalesService;
