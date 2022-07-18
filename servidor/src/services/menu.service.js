const boom = require('@hapi/boom');
// const{models}=require('../libs/sequelize');
const pool = require('../libs/postgres.pool');


class MenuService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));

  }
  async create(data) {

    const { name, description } = data;
    const query = {
      text: `INSERT INTO brands(name,description) VALUES($1,$2) RETURNING *`,
      values: [name, description]
    };
    const newBrand = await this.pool.query(query);
    return newBrand.rows[0];
  }

  async find() {

    const query = 'SELECT * FROM menus';
    const menus = await this.pool.query(query);
    return menus.rows;

  }
  async findAllSugerencias() {

    const query = 'SELECT * FROM sugerencias_consejos';
    const sur = await this.pool.query(query);
    return sur.rows;

  }
  async findCount() {

    const query = 'SELECT count(*) FROM brands';
    const brands = await this.pool.query(query);
    return brands.rows[0];

  }

  async findOne(id) {
    const query = {
      text: `SELECT * FROM menus WHERE id=$1`,
      values: [id]
    };
    const menu = await this.pool.query(query);
    if (menu.rows.length === 0) {
      throw boom.notFound('menu not found');
    }
    return menu.rows[0];
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

  async updateMenuNosotros(id, changes) {
    await this.findOne(id);
    const { description,mision,vision } = changes;
    const query = {
      text: `UPDATE menus SET description=$1,mision=$2,vision=$3 WHERE id=$4 RETURNING *`,
      values: [description,mision,vision, id]
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }

  async delete(id) {
    await this.findOne(id);
    const query = {
      text: `DELETE FROM brands WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }

}

module.exports = MenuService;
