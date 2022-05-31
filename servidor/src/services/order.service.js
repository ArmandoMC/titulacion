// const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const pool = require('../libs/postgres.pool');

class OrderService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }
  async create(userId) {
    const statement = {
      text: `SELECT * FROM customers WHERE user_id=$1`,
      values: [userId]
    };
    if (statement.rows.length === 0) {
      throw boom.notFound('user not found');
    }
    const customer = statement.rows[0];
    const query = {
      text: `INSERT INTO orders(customer_id) VALUES($1) RETURNING *`,
      values: [customer.id]
    };
    const newOrder = await this.pool.query(query);
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

module.exports = OrderService;
