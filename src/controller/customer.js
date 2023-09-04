const { createCustomer, findIdCustomer, selectCustomer, updateCustomer, findEmail, selectAllCustomer, countCustomer, deleteCustomer } = require("../models/customer");
const { v4: uuidv4 } = require("uuid");
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require('../middleware/cloudinary');


let customerController = {
  getAllCustomer: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "customer_id";
      const sort = req.query.sort || "ASC";
      let result = await selectAllCustomer({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countCustomer();
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
        "Get Customer Data Success",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },
  registerCustomer: async (req, res) => {
    try {
      const { customer_name, customer_email, customer_pass} = req.body;
      const { rowCount } = await findEmail(customer_email);
      if (rowCount) {
        return res.json({ message: "Email is already taken" });
      }
      // const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(customer_pass);
      const customer_id = uuidv4();
      const data = {
        customer_id,
        customer_name,
        customer_email,
        passwordHash,
      };
      await createCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "created")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  loginCustomer: async (req, res) => {
    try {
      const CustomerSchema = Joi.object({
        customer_email: Joi.string().email().required(),
        customer_pass: Joi.string().required(),
      });

      const { error } = CustomerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      
      const { customer_email, customer_pass } = req.body;
      const {
        rows: [customer],
      } = await findEmail(customer_email);

      if (!customer) {
        return res.status(401).json({ message: "Email is incorrect!" });
      }

      const isValidPassword = bcrypt.compareSync(customer_pass, customer.customer_pass);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Incorrect password!" });
      }

      delete customer.customer_pass;

      const payload = {
        customer_email: customer.customer_email,
        // customer_role: customer.customer_role
      };

      console.log(isValidPassword)

      customer.user_token = authHelper.generateToken(payload);
      customer.refreshToken = authHelper.refreshToken(payload);


      commonHelper.response(res, customer, 200, "Login is successful");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  },
  getDetailCustomer: async (req, res) => {
    const customer_id = String(req.params.id);
    const { rowCount } = await findIdCustomer(customer_id);
    if (!rowCount) {
      return res.json({ message: "Profile is not found" });
    }
    selectCustomer(customer_id)
      .then(
        result => {
          // client.setEx(`products/${id}`,60*60,JSON.stringify(result.rows))
          commonHelper.response(res, result.rows, 200, "get data success from database")
        }
      )
      .catch(err => res.send(err)
      )
  },
  updateCustomer: async (req, res) => {
    try {
      const customer_id = String(req.params.id)
      const { customer_name, customer_phone } = req.body
      const { rowCount } = await findIdCustomer(customer_id)
      if (!rowCount) {
        return next(createError(403, "Profile is Not Found"))
      }

      let avatar = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        avatar = result.secure_url;
      }

      const data = {
        customer_id,
        customer_name,
        customer_phone,
        avatar
      }
      updateCustomer(data)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Profile updated")
        )
        .catch(err => res.send(err)
        )
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT)
    const payload = {
      customer_email: decoded.customer_email,
      customer_role: decoded.customer_role
    }
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.refreshToken(payload)
    }
    commonHelper.response(res, result, 200, "Token already generate!")
  },
  deleteCustomer: async (req, res) => {
    try {
      const customer_id = req.params.id;
      const deleteResult = await deleteCustomer(customer_id);

      if (deleteResult) {
        commonHelper.response(res, null, 200, 'Customer deleted successfully');
      } else {
        commonHelper.response(res, null, 404, 'Customer not found');
      }
    } catch (error) {
      console.error(error);
      commonHelper.response(res, null, 500, 'Error deleting Customer');
    }
  },
};

module.exports = customerController;
