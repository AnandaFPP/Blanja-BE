const express = require("express");
const router = express.Router();
const orderController = require("../controller/order");

router
  .get("/", orderController.getAllOrder)
  .get("/:id", orderController.getDetailOrder)
  .post("/", orderController.createOrder)
  .put("/:id", orderController.updateOrder)
  .delete("/:id", orderController.deleteOrder);

module.exports = router;