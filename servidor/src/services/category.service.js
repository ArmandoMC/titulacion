const boom = require('@hapi/boom');
// const{models}=require('../libs/sequelize');
const pool = require('../libs/postgres.pool');


class CategoryService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));

  }
  async create(data) {

    const { name, description } = data;
    const query = {
      text: `INSERT INTO categories(name,description) VALUES($1,$2) RETURNING *`,
      values: [name, description]
    };
    const newCategory = await this.pool.query(query);
    return newCategory.rows[0];
  }

  async find() {

    const query = 'SELECT * FROM categories';
    const categories = await this.pool.query(query);
    return categories.rows;

  }
  async findCount() {

    const query = 'SELECT count(*) FROM categories';
    const categories = await this.pool.query(query);
    return categories.rows[0];

  }
  async findSubCategories() {

    const query = 'SELECT * FROM subcategories';
    const subcategories = await this.pool.query(query);
    return subcategories.rows;

  }
  async findProductsBySubCat(id) {

    let sql;
       sql = {
          text: `SELECT * FROM products WHERE subcategory_id=$1`,
          values: [id]
        };      
    // }
    const products = await this.pool.query(sql);
    // console.log(products.rows);
    return products.rows;
  }

  async findOne(id) {
    const query = {
      text: `SELECT * FROM categories WHERE id=$1`,
      values: [id]
    };
    const category = await this.pool.query(query);
    if (category.rows.length === 0) {
      throw boom.notFound('category not found');
    }
    return category.rows[0];
  }
  async findByCategory(id, query) {

    const { limit, offset } = query;
    let statement;
    if (limit && offset != null) {
      statement = {
        text: `SELECT * FROM products WHERE category_id=$1 LIMIT ${limit} OFFSET ${offset}`,
        values: [id]
      }
    } else {
      statement = {
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
    const { name, description } = changes;
    const query = {
      text: `UPDATE categories SET name=$1, description=$2 WHERE id=$3 RETURNING *`,
      values: [name, description, id]
    };
    const rta = await this.pool.query(query);
    return rta.rows[0];
  }

  async delete(id) {
    await this.findOne(id);
    const query = {
      text: `DELETE FROM categories WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }

}

module.exports = CategoryService;
