const Pool = require('../config/db')


const selectAllProduct = ({limit,offset,sort,sortby}) => {
  return Pool.query(`SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectProduct = (id) => {
  return Pool.query(`SELECT * FROM products WHERE id = '${id}'`)
}
const insertProduct = (data) => {
  const { id,name,stock,price,photo,description } = data
  return Pool.query(`INSERT INTO products(id, name, stock, price, photo, description) VALUES('${id}', '${name}', ${stock}, ${price}, '${photo}', '${description}')`)
}
const updateProduct = (data) => {
  const { id, name, stock, price, photo, description } = data
  return Pool.query(`UPDATE products SET name = '${name}', stock = ${stock}, price = ${price} , photo = '${photo}' , description = '${description}' WHERE id = '${id}'`)
}
const deleteProduct = (id) => {
  return Pool.query(`DELETE FROM products WHERE id = '${id}'`)
}

const countData = () =>{
  return Pool.query('SELECT COUNT(*) FROM products')
}

const findIdProduct =(id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT id FROM products WHERE id = '${id}'`,(err,res)=>{
    if(!err){
      resolve(res)
    }else{
      reject(err)
    }
  })
  )
}

const searchProduct = ({keywords}) => {
    return Pool.query(`SELECT * FROM products WHERE name ILIKE '%${keywords}%'`)
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
