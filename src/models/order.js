const Pool = require("../config/db");

const selectAllOrder = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT orders.order_id, products.product_name, orders.order_quantity, products.product_price*orders.order_quantity AS total_order, products.product_image
    FROM orders
    INNER JOIN products ON orders.product_id = products.product_id
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectOrder = (customer_id) => {
  return Pool.query(`SELECT orders.order_id, products.product_name, orders.order_quantity, products.product_price*orders.order_quantity AS total_order, products.product_image
  FROM orders
  INNER JOIN products ON orders.product_id = products.product_id WHERE customer_id = '${customer_id}'`);
};

const insertOrder = (data) => {
  const { order_id, product_id, order_quantity, customer_id } = data;
  return Pool.query(
    `INSERT INTO orders(order_id, product_id, order_quantity, customer_id) VALUES('${order_id}', '${product_id}', ${order_quantity}, '${customer_id}' )`
  );
};

const updateOrder = (data) => {
  const { order_id, product_id, order_quantity } = data;
  return Pool.query(
    `UPDATE orders SET product_id = '${product_id}', order_quantity = ${order_quantity}  WHERE order_id = '${order_id}'`
  );
};

const deleteOrder = (customer_id) => {
  return Pool.query(`DELETE FROM orders WHERE customer_id = '${customer_id}'`);
};

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM orders`);
};

const findId = (order_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT order_id FROM orders WHERE order_id= '${order_id}'`,
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
  selectAllOrder,
  selectOrder,
  insertOrder,
  updateOrder,
  deleteOrder,
  countData,
  findId,
};