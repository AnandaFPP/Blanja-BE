const Pool = require('../config/db')


const selectAllCustomer = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM customer ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const createCustomer = (data) => {
  const {customer_id, customer_name, customer_email, passwordHash, verify,} = data
  return Pool.query(`INSERT INTO customer(customer_id, customer_name, customer_email, customer_pass, verify) VALUES('${customer_id}', '${customer_name}', '${customer_email}', '${passwordHash}', '${verify}')`)
}

const createUsersVerification = (customer_verification_id, customer_id, token) => {
  return Pool.query(
    `insert into customer_verification ( id , customer_id , token ) values ( '${customer_verification_id}' , '${customer_id}' , '${token}' )`
  );
};

const checkUsersVerification = (queryUsersId, queryToken) => {
  return Pool.query(
    `select * from customer_verification where customer_id='${queryUsersId}' and token = '${queryToken}' `
  );
};

const cekUser = (customer_email) => {
  return Pool.query(
    `select verify from customer where customer_email = '${customer_email}' `
  );
};

const deleteUsersVerification = (queryUsersId, queryToken) => {
  return Pool.query(
    `delete from customer_verification  where customer_id='${queryUsersId}' and token = '${queryToken}' `
  );
};

const updateAccountVerification = (queryUsersId) => {
  return Pool.query(
    `update customer set verify='true' where customer_id='${queryUsersId}' `
  );
};

const selectCustomer = (customer_id) => {
  return Pool.query(`SELECT * FROM customer WHERE customer_id = '${customer_id}'`)
}

const updateCustomer = (data) => {
  const { customer_id, customer_name, customer_phone, avatar } = data
  return Pool.query(`UPDATE customer SET customer_name = '${customer_name}', customer_phone = '${customer_phone}', avatar = '${avatar}' WHERE customer_id = '${customer_id}'`)
}

const deleteCustomer = (customer_id) => {
  return Pool.query(`DELETE FROM customer WHERE customer_id = '${customer_id}'`)
}

const findEmail =(customer_email)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT * FROM customer WHERE customer_email = '${customer_email}'`,(err,res)=>{
    if(!err){
      resolve(res)
    }else{
      reject(err)
    }
  })
  )
}

const findIdCustomer =(customer_id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT * FROM customer WHERE customer_id ='${customer_id}'`,(err,res)=>{
    if(!err){
      resolve(res)
    }else{
      reject(err)
    }
  })
  )
}

const findSkills =(customer_id)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT FROM skills WHERE customer_id ='${customer_id}'`,(err,res)=>{
    if(!err){
      resolve(res)
    }else{
      reject(err)
    }
  })
  )
}

const countCustomer = () => {
  return Pool.query(`SELECT COUNT(*) FROM customer`);
};


module.exports = {
  createCustomer,
  findEmail,
  findIdCustomer,
  selectCustomer,
  selectAllCustomer,
  findSkills,
  updateCustomer,
  countCustomer,
  deleteCustomer,
  createUsersVerification,
  checkUsersVerification,
  cekUser,
  updateAccountVerification,
  deleteUsersVerification,
}
