const express = require("express");
const router = express.Router();
const addressController = require("../controller/address");

router
  .get("/", addressController.getAllAddress)
  .get("/:id", addressController.getDetailAddress)
  .post("/", addressController.createAddress)
  .put("/:id", addressController.updateAddress)
  .delete("/:id", addressController.deleteAddress);

module.exports = router;