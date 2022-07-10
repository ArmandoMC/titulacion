const boom = require('@hapi/boom');
// const{models}=require('../libs/sequelize');
const pool = require('../libs/postgres.pool');


class ProviderService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));

  }
  async create(data) {

    const { name, ruc,address,phone } = data;
    const query = {
      text: `INSERT INTO providers(name,ruc,address,phone) VALUES($1,$2,$3,$4) RETURNING *`,
      values: [name, ruc,address,phone]
    };
    const newProvider = await this.pool.query(query);
    return newProvider.rows[0];
  }

  async find() {

    const query = 'SELECT * FROM providers';
    const providers = await this.pool.query(query);
    return providers.rows;

  }

  async findOne(id) {
    const query = {
      text: `SELECT * FROM providers WHERE id=$1`,
      values: [id]
    };
    const provider = await this.pool.query(query);
    if (provider.rows.length === 0) {
      throw boom.notFound('provider not found');
    }
    return provider.rows[0];
  }
  async findByCategory(id, query) {

    const { limit, offset } = query;
    let statement;
    if (limit && offset!=null) {
      statement ={
        text: `SELECT * FROM products WHERE category_id=$1 LIMIT ${limit} OFFSET ${offset}`,
        values: [id]
      }
    }else{
      statement ={
        text: `SELECT * FROM products WHERE category_id=$1`,
        values: [id]
      }
    }
    
    const products = await this.pool.query(statement);
    if (products.rows.length === 0) {
      return [];

      // throw boom.notFound('products not found for it category');
    }
    return products.rows;
  }

  async update(id, changes) {
    await this.findOne(id);
    const { name, ruc,address,phone } = changes;
    const query = {
      text: `UPDATE providers SET name=$1, ruc=$2,address=$3,phone=$4 WHERE id=$5 RETURNING *`,
      values: [name, ruc,address,phone, id]
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }

  async delete(id) {
    await this.findOne(id);
    const query = {
      text: `DELETE FROM providers WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }

}

module.exports = ProviderService;
