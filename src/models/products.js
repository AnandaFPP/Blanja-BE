const Pool = require('../config/db')


const selectAllProduct = ({limit,offset,sort,sortby}) => {
  return Pool.query(`SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectProduct = (product_id) => {
  return Pool.query(`SELECT * FROM products WHERE product_id = '${product_id}'`)
}
const insertProduct = (data) => {
  const { product_id, category_id, product_name, product_stock, product_price, product_image, product_description } = data
  return Pool.query(`INSERT INTO products(product_id, category_id, product_name, product_stock, product_price, product_image, product_description) VALUES('${product_id}', ${category_id}, '${product_name}', ${product_stock}, ${product_price}, '${product_image}', '${product_description}')`)
}
const updateProduct = (data) => {
  const { product_id, product_name, product_stock, product_price, product_image, product_description } = data
  return Pool.query(`UPDATE products SET product_name = '${product_name}', product_stock = ${product_stock}, product_price = ${product_price} , product_image = '${product_image}' , product_description = '${product_description}' WHERE product_id = '${product_id}'`)
}
const deleteProduct = (product_id) => {
  return Pool.query(`DELETE FROM products WHERE product_id = '${product_id}'`)
}

const countData = () =>{
  return Pool.query('SELECT COUNT(*) FROM products')
}

const findIdProduct =(product_id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT product_id FROM products WHERE product_id = '${product_id}'`,(err,res)=>{
    if(!err){
      resolve(res)
    }else{
      reject(err)
    }
  })
  )
}

const searchProduct = ({keywords}) => {
    return Pool.query(`SELECT * FROM products WHERE product_name ILIKE '%${keywords}%'`)
  }


module.exports = {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findIdProduct,
  searchProduct
}
