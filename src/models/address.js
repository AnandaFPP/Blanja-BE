const Pool = require("../config/db");

const selectAllAddress = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM address ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectAddress = (customer_id) => {
  return Pool.query(`SELECT * FROM address WHERE customer_id = '${customer_id}'`);
};

const createAddress = (data) => {
  const {
    address_id,
    address_name,
    address_street,
    address_phone,
    address_postal,
    address_city,
    address_place,
    customer_id,
  } = data;
  return Pool.query(
    `INSERT INTO address( address_id, address_name, address_street, address_phone, address_postal, address_city, address_place, customer_id) VALUES(${address_id},'${address_name}', '${address_street}', '${address_phone}', '${address_postal}', '${address_city}', '${address_place}','${customer_id}')`
  );
};

const updateAddress = (data) => {
  const {
    address_id,
    address_name,
    address_street,
    address_phone,
    address_postal,
    address_city,
    address_place,
  } = data;
  return Pool.query(
    `UPDATE address SET address_name = '${address_name}', address_street = '${address_street}', address_phone = '${address_phone}', address_postal = '${address_postal}', address_city = '${address_city}', address_place = '${address_place}' WHERE address_id = ${address_id}`
  );
};

const deleteAddress = (address_id) => {
  return Pool.query(`DELETE FROM address WHERE address_id = ${address_id}`);
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM address`);
};

const findId = (address_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT address_id FROM address WHERE address_id=${address_id}`,
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
  selectAllAddress,
  selectAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  countData,
  findId,
};