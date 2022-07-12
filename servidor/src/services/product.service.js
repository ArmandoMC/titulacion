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
    const { name, description, sleeve_color, flavor, presentation, packaging, stock,
      purchase_price, price, image, public_id, category_id,subcategory_id,
      brand_id, provider_id } = data;
    const query = {
      text: `INSERT INTO products
      (name,description,sleeve_color,flavor,presentation,packaging,stock,purchase_price,
        price,image,public_id,category_id,subcategory_id,brand_id,provider_id) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
      values: [name, description,sleeve_color, flavor, presentation, packaging, stock,
        purchase_price, price, image, public_id, category_id,subcategory_id,
        brand_id, provider_id]
    };
    const newProduct = await this.pool.query(query);
    if(newProduct.rows.length===0){
      throw boom.notFound('product no insertado');
    }
    const product=newProduct.rows[0];
    const cod='P00'+product.id;
    const query2={
      text:`UPDATE products SET cod_product=$1 WHERE id=$2 RETURNING *`,
      values:[cod,product.id]
    }
    const updateCodProduct = await this.pool.query(query2);
    if(updateCodProduct.rows.length===0){
      throw boom.notFound('codigo de producto no se pudo actualizar');
    }
    return updateCodProduct.rows[0];
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

  async findUltimoId() {

    const query = {
      text: `SELECT max(id) FROM products`
    };
    const product = await this.pool.query(query);
    console.log('ultimo id obtenido:',product.rows[0])
    if (product.rows.length === 0) {
      throw boom.notFound('product not found');
    }
    return product.rows[0];
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
  async count() {

    const query = {
      text: `SELECT count(*) FROM products`,
    };
    const total = await this.pool.query(query);
    if (total.rows.length === 0) {
      throw boom.notFound('product not found');
    }
    console.log('numeo de prod:',total)
    return total.rows[0];
  }


  async update(id, changes) {

    await this.findOne(id);

     const { name, description, sleeve_color, flavor, presentation, packaging, stock,
      purchase_price, price, image,public_id, category_id,subcategory_id,
      brand_id, provider_id } = changes;
   
    const query2 = {
      text: `UPDATE products SET name=$1,description=$2,sleeve_color=$3,flavor=$4,presentation=$5,
      packaging=$6,stock=$7,purchase_price=$8,price=$9,image=$10,public_id=$11,category_id=$12,subcategory_id=$13,brand_id=$14,
      provider_id=$15 WHERE id=$16 RETURNING *`,
      values: [name, description,sleeve_color,flavor,presentation,packaging,stock,purchase_price,
         price,image,public_id, category_id,subcategory_id, brand_id,provider_id,id]
    };
    const rta = await pool.query(query2);
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
    return {id};
  }

}

module.exports = ProductsService;
