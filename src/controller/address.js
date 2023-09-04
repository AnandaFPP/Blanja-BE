let {
    selectAllAddress,
    selectAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    countData,
    findId,
  } = require("../models/address");
  const commonHelper = require("../helper/common");
  
  let addressController = {
    getAllAddress: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const sortby = req.query.sortby || "address_id";
        const sort = req.query.sort || "ASC";
        let result = await selectAllAddress({ limit, offset, sort, sortby });
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
          "Get Address Data Success",
          pagination
        );
      } catch (err) {
        console.log(err);
      }
    },
    getDetailAddress: async (req, res) => {
      const customer_id = String(req.params.id);
      selectAddress(customer_id)
        .then((result) => {
          commonHelper.response(
            res,
            result.rows,
            200,
            "Get Address Detail Success"
          );
        })
        .catch((err) => res.send(err));
    },
    createAddress: async (req, res) => {
      const {
        address_name,
        address_street,
        address_phone,
        address_postal,
        address_city,
        address_place,
        customer_id,
      } = req.body;
      const {
        rows: [count],
      } = await countData();
      const address_id = Number(count.count) + 1;
      const data = {
        address_id,
        address_name,
        address_street,
        address_phone,
        address_postal,
        address_city,
        address_place,
        customer_id,
      };
      createAddress(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Create Address Success")
        )
        .catch((err) => res.send(err));
    },
    updateAddress: async (req, res) => {
      try {
        const address_id = Number(req.params.id);
        const {
          address_name,
          address_street,
          address_phone,
          address_postal,
          address_city,
          address_place,
        } = req.body;
        const { rowCount } = await findId(address_id);
        
        if (!rowCount) {
          res.json({ message: "ID Not Found" });
        }
        const data = {
          address_id,
          address_name,
          address_street,
          address_phone,
          address_postal,
          address_city,
          address_place,
        };
        updateAddress(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Update Address Success")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteAddress: async (req, res) => {
      try {
        const address_id = Number(req.params.id);
        const { rowCount } = await findId(address_id);
        
        if (!rowCount) {
          res.json({ message: "ID Not Found" });
        }
        deleteAddress(address_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Delete Address Success")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = addressController;