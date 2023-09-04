const Pool = require("../config/db");

const createSeller = (data) => {
  const {
    seller_id,
    seller_name,
    seller_store,
    seller_email,
    seller_phone,
    passwordHash,
  } = data;
  return Pool.query(`INSERT INTO seller( seller_id, seller_email, seller_pass, seller_name, seller_store, seller_phone ) 
    VALUES ('${seller_id}','${seller_email}','${passwordHash}','${seller_name}','${seller_store}','${seller_phone}')`);
};

const updateSeller = (data) => {
  const {
    seller_id,
    seller_store,
    seller_email,
    seller_phone,
    seller_description,
    avatar
  } = data;
  return Pool.query(
    `UPDATE seller SET seller_store = '${seller_store}', seller_email = '${seller_email}', seller_phone = '${seller_phone}', seller_description = '${seller_description}', avatar = '${avatar}' WHERE seller_id = '${seller_id}'`
  );
};

const selectAllSeller = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM seller ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};
const selectSeller = (seller_id) => {
  return Pool.query(`SELECT * FROM seller WHERE seller_id = '${seller_id}'`);
};

const findEmail = (seller_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM seller WHERE seller_email= '${seller_email}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM seller`);
};

const findId = (seller_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT seller_id FROM seller WHERE seller_id='${seller_id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

module.exports = {
  createSeller,
  findEmail,
  updateSeller,
  selectAllSeller,
  selectSeller,
  countData,
  findId,
};
