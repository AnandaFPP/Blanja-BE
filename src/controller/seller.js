const { createSeller, findEmail, selectAllSeller, updateSeller, countData, selectSeller, findId } = require("../models/seller");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require('../middleware/cloudinary');

let sellerController = {
  getAllSeller: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "seller_id";
      const sort = req.query.sort || "ASC";
      let result = await selectAllSeller({ limit, offset, sort, sortby });
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
        "Get Seller Data Success",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },

  getDetailSeller: async (req, res) => {
    const seller_id = String(req.params.id);
    const { rowCount } = await findId(seller_id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectSeller(seller_id)
      .then((result) => {
        commonHelper.response(
          res,
          result.rows,
          200,
          "Get Seller Detail Success"
        );
      })
      .catch((err) => res.send(err));
  },

  registerSeller: async (req, res) => {
    const {
      seller_name,
      seller_email,
      seller_pass,
      seller_phone,
      seller_store,
    } = req.body;
    const { rowCount } = await findEmail(seller_email);
    if (rowCount) {
      return res.json({ message: "Email Already Taken" });
    }
    const passwordHash = bcrypt.hashSync(seller_pass);
    const seller_id = uuidv4();

    const data = {
      seller_id,
      seller_name,
      seller_email,
      seller_phone,
      seller_store,
      passwordHash
    };
    createSeller(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create User Success")
      )
      .catch((err) => res.send(err));
  },
  loginSeller: async (req, res) => {
    const { seller_email, seller_pass } = req.body;
    const {
      rows: [seller],
    } = await findEmail(seller_email);
    if (!seller) {
      return res.json({ message: "Email Wrong" });
    }
    const isValidPassword = bcrypt.compareSync(
      seller_pass,
      seller.seller_pass
    );
    if (!isValidPassword) {
      return res.json({ message: "Password Wrong" });
    }
    delete seller.seller_pass;
    const payload = {
      seller_email: seller.seller_email,
      role_seller: seller.role_seller,
    };
    seller.user_token = authHelper.generateToken(payload);
    seller.refreshToken = authHelper.refreshToken(payload);
    commonHelper.response(res, seller, 201, "Login Successfuly");
  },

  updateSeller: async (req, res) => {
    try {
      const seller_id = String(req.params.id);
      const { seller_store, seller_email, seller_phone, seller_description } = req.body;

      let avatar = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        avatar = result.secure_url;
      }

      const data = {
        seller_id,
        seller_store,
        seller_email,
        seller_phone,
        seller_description,
        avatar
      };
      updateSeller(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Product Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  profileUser: async (req, res) => {
    const seller_email = req.payload.seller_email;
    const {
      rows: [user],
    } = await findEmail(seller_email);
    delete user.seller_pass;
    commonHelper.response(res, user, 200);
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      seller_email: decoded.seller_email,
      role_seller: decoded.role_seller,
    };
    const result = {
      user_token: authHelper.generateToken(payload),
      refreshToken: authHelper.refreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = sellerController;