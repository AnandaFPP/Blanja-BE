const Pool = require('../config/db')


const selectAllCategory = ({limit,offset,sort,sortby}) => {
  return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectCategory = (category_id) => {
  return Pool.query(`SELECT * FROM category WHERE category_id = ${category_id}`)
}
const insertCategory = (data) => {
  const {category_id, category_name} = data
  const date = new Date().toISOString()
  return Pool.query(`INSERT INTO category(category_id, category_name) VALUES(${category_id}, '${category_name}')`)
}
const updateCategory = (data) => {
  const { category_id, category_name } = data
  return Pool.query(`UPDATE category SET category_name = '${category_name}' WHERE category_id = ${category_id}`)
}
const deleteCategory = (category_id) => {
  return Pool.query(`DELETE FROM category WHERE category_id = ${category_id}`)
}

const countCategory = () =>{
  return Pool.query('SELECT COUNT(*) FROM category')
}

const findIdCategory =(category_id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT category_id FROM category WHERE category_id = ${category_id}`,(err,res)=>{
    if(!err){
      resolve(res)
    }else{
      reject(err)
    }
  })
  )
}

const searchCategory = (category_name) => {
   return Pool.query(`SELECT * FROM category WHERE category_name ILIKE '%${category_name}%'`)
  }

module.exports = {
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countCategory,
  findIdCategory,
  searchCategory
}