const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer");
const uploadAvatar = require("../middleware/uploadAvatar");
// const {protect} = require('../middleware/auth')

router
  .post("/register", customerController.registerCustomer)
  .post("/login", customerController.loginCustomer)
  .get("/", customerController.getAllCustomer)
  .get("/profile/:id", customerController.getDetailCustomer)
  .put("/profile/:id", uploadAvatar, customerController.updateCustomer)
  .post("/refreshToken", customerController.refreshToken)
  .delete('/profile/:id', customerController.deleteCustomer);

module.exports = router;