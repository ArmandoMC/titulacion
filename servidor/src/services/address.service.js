const boom = require('@hapi/boom');
// const getconnection=require('../libs/postgres');
const pool = require('../libs/postgres.pool');
// const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');


class AddressService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const{address,city,state,country,postal_code,user_id}=data;
    const query = {
      text: `INSERT INTO address(address,city,state,country,postal_code,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      values: [address,city,state,country,postal_code,user_id]
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }

  async find() {
    const query = `SELECT ad.city,ad.address FROM address ad JOIN users U ON ad.user_id=U.id`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }
  async findByEmail(email) {
    const query = {
      text: `SELECT * FROM users WHERE email=$1`,
      values: [email]
    };
    const user = await this.pool.query(query);
    return user.rows[0];
  }

  async findOne(id) {
    const query = {
      text: `SELECT * FROM address WHERE user_id=${id}`
    };
    // const query = `SELECT total,id_transaccion,status,ad.address FROM orders as or JOIN address as ad ON or.address_id=ad.id WHERE or.customer_id=${id}`;

    const address = await this.pool.query(query);
    console.log('dir:',address.rows[0])
    if (address.rows.length === 0) {
      return [];
      // throw boom.notFound('address not found');
      
    }
    return address.rows;
  }

  async update(id, changes) {
    await this.findOne(id);

    const { address,city,state,country,postal_code,user_id } = changes;
    const query = {
      text: `UPDATE address SET address=$1,city=$2,state=$3,country=$4,postal_code=$5,user_id=$6 WHERE id=$7 RETURNING *`,
      values: [address, city, state, country,postal_code,user_id,id]
    };
    const rta = await this.pool.query(query);
    console.log('direccion editada:',rta.rows[0])
    return rta.rows[0];
  }
  async updateRecoveryField(id, recoveryToken) {
    const query = {
      text: `UPDATE users SET recovery_token=$1 WHERE id=$2 RETURNING *`,
      values: [recoveryToken, id]
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }
  async updatePasswordField(id,token, newPassword) {
    const query = {
      text: `UPDATE users SET password=$1, recovery_token=$2 WHERE id=$3 RETURNING *`,
      values: [newPassword,token,id]
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }

  async delete(id) {
    const query = {
      text: `DELETE FROM address WHERE id=$1`,
      values: [id]
    }
    const rta=await this.pool.query(query);
    return rta.rows[0];
  }
}

module.exports = AddressService;
