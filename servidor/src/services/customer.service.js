const boom = require('@hapi/boom');
// const getconnection=require('../libs/postgres');
// const pool=require('../libs/postgres.pool');
// const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const pool = require('../libs/postgres.pool');

class CustomerService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));

  }
  async create(data) {
    const passwordReal=data.user.password;
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const { name, last_name, phone, user } = newData;
    let statement;
    if (!user.role) {
      const q1 = {
        text: `INSERT INTO users(email,password,password_real) VALUES($1,$2,$3) RETURNING *`,
        values: [user.email, user.password,passwordReal]
      }
      statement = await this.pool.query(q1);

    } else {
      const q2 = {
        text: `INSERT INTO users(email,password,password_real,role) VALUES($1,$2,$3,$4) RETURNING *`,
        values: [user.email, user.password,passwordReal, user.role]
      }
      statement = await this.pool.query(q2);
    }

    const us = statement.rows[0];
    const query = {
      text: `INSERT INTO customers(name,last_name,user_id) VALUES($1,$2,$3) RETURNING *`,
      values: [name, last_name, us.id]
    }
    const newCustomer = await this.pool.query(query);

    // delete newCustomer.user.password;
    return newCustomer.rows[0];

  }

  async findClientByUser(userId) {

    const query = `SELECT C.id,name, last_name,dni,phone FROM customers C JOIN users U ON C.user_id=${userId} `;
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }

  async findOne(id) {
    const query = {
      text: `SELECT * FROM customers WHERE id=$1`,
      values: [id]
    };
    const customer = await this.pool.query(query);
    if (customer.rows.length===0) {
      throw boom.notFound('customer not found');
    }
    return customer.rows[0];
  }

  async update(id, changes) {
    await this.findOne(id);
    const { name, lastName, phone } = changes;
    const query = {
      text: `UPDATE customers SET name=$1,last_name=$2,phone=$3 WHERE id=$4 RETURNING *`,
      values: [name, lastName, phone, id]
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }
  async updateDniAndPhone(id, changes) {
    const { dni, phone } = changes;
    const query = {
      text: `UPDATE customers SET dni=$1,phone=$2 WHERE id=$3 RETURNING *`,
      values: [dni, phone, id]
    };
    const rta = await this.pool.query(query);
    if (rta.rows.length===0) {
      throw boom.notFound('customer not found');
    }
    return rta.rows[0];
  }
  async updateNombreCompleto(id, changes) {
    const { name, last_name,dni,phone } = changes;
    const query = {
      text: `UPDATE customers SET name=$1,last_name=$2,dni=$3,phone=$4 WHERE user_id=$5 RETURNING *`,
      values: [name,last_name,dni, phone, id]
    };
    const rta = await this.pool.query(query);
    if (rta.rows.length===0) {
      throw boom.notFound('customer no se pudo actualizar');
    }
    console.log('customer actualizado:',rta.rows[0])
    return rta.rows[0];
  }

  async delete(id) {
    await this.findOne(id);
    const query = {
      text: `DELETE FROM customers WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }

}

module.exports = CustomerService;
