const boom = require('@hapi/boom');
// const getconnection=require('../libs/postgres');
const pool = require('../libs/postgres.pool');
// const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');


class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);

    const newUser = {
      ...data,
      password: hash
    };

    const { email, password, role } = newUser;
    const query = {
      text: `INSERT INTO users(email,password,role) VALUES($1,$2,$3) RETURNING *`,
      values: [email, password, role]
    };
    const rta = await this.pool.query(query);
    delete rta.rows[0].password;
    delete rta.rows[0].recovery_token;
    return rta.rows[0];
  }

  async find() {
    const query = `SELECT U.id,email,role, C.name,C.last_name,C.phone,C.id as id_customer FROM users U JOIN customers C ON U.id=C.user_id`;
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
      text: `SELECT * FROM users WHERE id=$1`,
      values: [id]
    };
    const user = await this.pool.query(query);
    if (user.rows.length === 0) {
      throw boom.notFound('user not found');
    }
    delete user.rows[0].password;
    return user.rows[0];
  }

  async update(id, changes) {
    await this.findOne(id);
    const hash = await bcrypt.hash(changes.password, 10);
    changes.password = hash;
    const { email, password, role } = changes;
    const query = {
      text: `UPDATE users SET email=$1,password=$2,role=$3 WHERE id=$4 RETURNING *`,
      values: [email, password, role, id]
    };
    const rta = await this.pool.query(query);
    delete rta.rows[0].password;
    delete rta.rows[0].recovery_token;
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
    await this.findOne(id);
    const query = {
      text: `DELETE FROM users WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }
}

module.exports = UserService;
