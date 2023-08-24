const {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findIdProduct,
  searchProduct,
} = require("../models/products");
// const client = require('../config/redis')
const commonHelper = require("../helper/common");
const cloudinary = require('../middleware/cloudinary');
const { v4: uuidv4 } = require("uuid");

let productController = {
  getAllProduct: async (req, res) => {
    try {
      // const role = req.payload.role;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const search = req.query.search || "";
      const result = await selectAllProduct({
        limit,
        offset,
        sortby,
        sort,
        search
      });
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
        "Get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },
  getDetailProduct: async (req, res) => {
    const id = String(req.params.id);
    const { rowCount } = await findIdProduct(id);
    if (!rowCount) {
      return res.json({ message: "ID is not found" });
    }
    selectProduct(id)
    .then(
      result => {
      // client.setEx(`products/${id}`,60*60,JSON.stringify(result.rows))
      commonHelper.response(res, result.rows, 200, "get data success from database")
      }
    )
    .catch(err => res.send(err)
    )
  },
  createProduct: async (req, res) => {
    const { name, stock, price, description } = req.body;
    let photo = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        photo = result.secure_url;
      }
      
      const id = uuidv4();
      
      const data = {
        id,
      name,
      stock,
      price,
      photo,
      description,
    };
    console.log(data)
    insertProduct(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "Product created")
      )
      .catch((err) => res.send(err));
  },
  updateProduct: async (req, res) => {
    try{
      const id = String(req.params.id);
      const { name,stock,price,description } = req.body
      let photo = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        photo = result.secure_url;
      }

      const {rowCount} = await findIdProduct(id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }

      const data ={
        id,
        name,
        stock,
        price,
        photo,
        description
      }
      updateProduct(data)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch(err => res.send(err)
          )
        }catch(error){
          console.log(error);
        }
  },
  deleteProduct: async (req, res) => {
    let id = String(req.params.id);
    const { rowCount } = await findIdProduct(id);
    if (!rowCount) {
      return res.json({ message: "ID is not found" });
    }
    deleteProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Product deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  searchProduct: async (req, res) => {
    try {
      const keywords = req.query.keywords || "";
      let result = await searchProduct({ keywords });
      commonHelper.response(res, result.rows, 200, "Search success");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = productController;
