const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
// const {protect, validationRoleSeller} = require('../middleware/auth')
const uploadProduct = require("../middleware/uploadProduct");
// const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')

router
  .get("/", productController.getAllProduct)
  .get("/search", productController.searchProduct)
  .get("/:id", productController.getDetailProduct)
  .post("/", uploadProduct, productController.createProduct)
  .put("/:id", uploadProduct, productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

module.exports = router;