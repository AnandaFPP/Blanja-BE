let {
    selectAllOrder,
    selectOrder,
    insertOrder,
    updateOrder,
    deleteOrder,
    countData,
    findId,
  } = require("../models/order");
  const commonHelper = require("../helper/common");
  const { v4: uuidv4 } = require("uuid");
  
  let orderController = {
    getAllOrder: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const sortby = req.query.sortby || "order_id";
        const sort = req.query.sort || "ASC";
        let result = await selectAllOrder({ limit, offset, sort, sortby });
        const {
          rows: [count],
        } = await countData();
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData / limit);
        const pagination = {
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage,
        };
        commonHelper.response(
          res,
          result.rows,
          200,
          "Get Order Data Success",
          pagination
        );
      } catch (err) {
        console.log(err);
      }
    },
    getDetailOrder: async (req, res) => {
      const customer_id = String(req.params.id);
      selectOrder(customer_id)
        .then((result) => {
          commonHelper.response(
            res,
            result.rows,
            200,
            "Get Order Detail Success"
          );
        })
        .catch((err) => res.send(err));
    },
    createOrder: async (req, res) => {
      const { product_id, order_quantity, customer_id } = req.body;
      const {
        rows: [count],
      } = await countData();
      const order_id = uuidv4();
      const data = {
        order_id,
        product_id,
        order_quantity,
        customer_id,
      };
      insertOrder(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Create Order Success")
        )
        .catch((err) => res.send(err));
    },
    updateOrder: async (req, res) => {
      try {
        const order_id = String(req.params.id);
        const { product_id, order_quantity } = req.body;
        const { rowCount } = await findId(order_id);
        if (!rowCount) {
          res.json({ message: "ID Not Found" });
        }
        const data = {
          order_id,
          product_id,
          order_quantity,
        };
        updateOrder(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Update Order Success")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteOrder: async (req, res) => {
      try {
        const customer_id = String(req.params.id);
        deleteOrder(customer_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Delete Order Success")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = orderController;