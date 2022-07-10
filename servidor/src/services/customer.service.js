const boom = require('@hapi/boom');
// const getconnection=require('../libs/postgres');
// const pool=require('../libs/postgres.pool');
// const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const pool = require('../libs/postgres.pool');
const Customer=require('../models/customer.model');
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
  async createByAdmin(data) {
    const passwordReal=data.user.password;
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const { name, last_name, dni,phone, user } = newData;
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

    if (statement.rows.length===0) {
      throw boom.notFound('user no se pudo crear');
    }
    const us = statement.rows[0];

    // console.log('usuario creado:',us)
    const query = {
      text: `INSERT INTO customers(name,last_name,dni,phone,user_id) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      values: [name, last_name,dni,phone, us.id]
    }
    const newCustomer = await this.pool.query(query);
    
    console.log('cliente creado para usuario:', newCustomer.rows[0])
    if (newCustomer.rows.length===0) {
      throw boom.notFound('cliente no se pudo crear');
    }
    // delete newCustomer.user.password;
    return {customer:newCustomer.rows[0],
            user:us};

  }

  async findClientByUser(userId) {

    const query = `SELECT C.id,name, last_name,dni,phone FROM customers C JOIN users U ON C.user_id=${userId} `;
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }
  async findCount() {

    const query = `SELECT count(*) FROM users WHERE role='customer'`;
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }

  async findAll() {
    const query = {
      text: `SELECT c.id,c.name,c.last_name,c.dni,c.phone,us.email FROM customers c INNER JOIN users us ON c.user_id=us.id WHERE us.role='customer'`
      // text: `SELECT * FROM customers c INNER JOIN users us ON c.user_id=us.id`
    };
    const customers = await this.pool.query(query);
    
    if (customers.rows.length===0) {
      return [];
      // throw boom.notFound('customer not found');
    }
    // const query2 = {
    //   text: `SELECT * FROM users us INNER JOIN customers c ON us.id=c.user_id`
    // };
    // const users = await this.pool.query(query2);
    // if (users.rows.length===0) {
    //   return [];
    //   // throw boom.notFound('customer not found');
    // }
    // const user={
    //   email:customer.rows[0].email
    // }
    // const array=new Customer([]);
    // const cust=new Array(customer.rows.length);
    // cust.forEach((item,index)=>{
    //   array[index].
    // })

    return customers.rows;
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

  async update2(id, changes) {
    await this.findOne(id);
    const { name, last_name, dni,phone,user } = changes;
    const query = {
      text: `UPDATE customers SET name=$1,last_name=$2,dni=$3,phone=$4 WHERE id=$5 RETURNING *`,
      values: [name, last_name, dni,phone, id]
    };
    const customer = await this.pool.query(query);
    if (customer.rows.length===0) {
      throw boom.notFound('customer not found');
    }
    const cliente=customer.rows[0];
    console.log('datos de custom actualizado',customer.rows[0])
    const query2 = {
      text: `UPDATE users SET email=$1 WHERE id=$2 RETURNING *`,
      values: [user.email, cliente.user_id]
    };
    const us = await this.pool.query(query2);
    const usuario=us.rows[0];
    console.log('email de user actualiza',us.rows[0])
    return {
      customer:cliente,
      user:usuario
    };
  }
  async update(id, changes) {
    await this.findOne(id);
    const { name, lastName, dni,phone } = changes;
    const query = {
      text: `UPDATE customers SET name=$1,last_name=$2,dni=$3,phone=$4 WHERE id=$5 RETURNING *`,
      values: [name, lastName, dni,phone, id]
    };
    const customer = await this.pool.query(query);
    if (customer.rows.length===0) {
      throw boom.notFound('customer not found');
    }
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
    const { name, lastName} = changes;
    const query = {
      text: `UPDATE customers SET name=$1,last_name=$2 WHERE user_id=$3 RETURNING *`,
      values: [name,lastName,id]
    };
    const rta = await this.pool.query(query);
    if (rta.rows.length===0) {
      throw boom.notFound('nombre completo de customer no se pudo actualizar');
    }
    console.log('nombre completo de customer actualizado:',rta.rows[0])
    return rta.rows[0];
  }
  async updateDni(id, changes) {
    const { dni } = changes;
    const query = {
      text: `UPDATE customers SET dni=$1 WHERE user_id=$2 RETURNING *`,
      values: [dni, id]
    };
    const rta = await this.pool.query(query);
    if (rta.rows.length===0) {
      throw boom.notFound('dni no se pudo actualizar');
    }
    console.log('dni actualizado:',rta.rows[0])
    return rta.rows[0];
  }
  async updatePhone(id, changes) {
    const { phone } = changes;
    const query = {
      text: `UPDATE customers SET phone=$1 WHERE user_id=$2 RETURNING *`,
      values: [phone, id]
    };
    const rta = await this.pool.query(query);
    if (rta.rows.length===0) {
      throw boom.notFound('phone no se pudo actualizar');
    }
    console.log('phone actualizado:',rta.rows[0])
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
