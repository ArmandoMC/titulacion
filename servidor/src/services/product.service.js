// const faker = require('faker');
// const {Op} = require('sequelize');

const boom = require('@hapi/boom');
// const { models } = require('../libs/sequelize');
const pool = require('../libs/postgres.pool');

class ProductsService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }


  async create(data) {
    const { name, description, sleeveColor, flavor, presentation, packaging, stock,
      wholesalePrice, sellingPrice, image, publicId, categoryId,
      brandId, statusId } = data;
    const query = {
      text: `INSERT INTO products
      (name,description,sleeve_color,flavor,presentation,packaging,stock,wholesale_price,
        selling_price,image,public_id,category_id,brand_id,status_id) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      values: [name, description,sleeveColor, flavor, presentation, packaging, stock,
        wholesalePrice, sellingPrice, image, publicId, categoryId,
        brandId, statusId]
    };
    const newProduct = await this.pool.query(query);
    return newProduct.rows[0];
  }

  async find(query) {
    const { limit, offset } = query;
    let sql;
    if (limit && offset) {
      sql = `SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`;

    } else {
      sql = 'SELECT * FROM products';
    }
    const products = await this.pool.query(sql);
    // console.log(products.rows);
    return products.rows;
  }

  async findOne(id) {

    const query = {
      text: `SELECT * FROM products WHERE id=$1`,
      values: [id]
    };
    const product = await this.pool.query(query);
    if (product.rows.length === 0) {
      throw boom.notFound('product not found');
    }
    return product.rows[0];
  }

  async update(id, changes) {

    await this.findOne(id);
    const { name, image, description, price, categoryId } = changes;
    const query = {
      text: `UPDATE products SET name=$1, image=$2,description=$3,price=$4,category_id=$5 WHERE id=$6 RETURNING *`,
      values: [name, image, description, price, categoryId, id]
    };
    const rta = await pool.query(query);
    return rta.rows[0];
  }
  async updateImagen(id, changes) {

    await this.findOne(id);
    const { image } = changes;
    const query = {
      text: `UPDATE products SET image=$1 WHERE id=$2 RETURNING *`,
      values: [image, id]
    };
    const rta = await pool.query(query);
    return rta.rows[0];
  }
  async updateStock(data) {

    let query;
    for(let i=0;i<data.length;i++) {
      query = {
        text: `UPDATE products SET stock=$1 WHERE id=${data[i].id} RETURNING *`,
        values: [(data[i].stock-data[i].oferta)]
      };
      let updateProduct = await this.pool.query(query);
      console.log('producto actualizado stock',updateProduct.rows)
    };
    return {message:'Stock de productos actualizados con éxito'};
  }

  async delete(id) {
    await this.findOne(id);
    const query = {
      text: `DELETE FROM products WHERE id=$1`,
      values: [id]
    }
    await this.pool.query(query);
    return { id };
  }

}

module.exports = ProductsService;
