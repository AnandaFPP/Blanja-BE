const express = require("express");
const router = express.Router();
const sellerController = require("../controller/seller");
// const {protect} = require('../middleware/auth')
const uploadAvatar = require("../middleware/uploadAvatar");

router
  .post("/register", sellerController.registerSeller)
  .post("/login", sellerController.loginSeller)
  .get("/profile", sellerController.getAllSeller)
  .get("/profile/:id", sellerController.getDetailSeller)
  .put("/profile/:id", uploadAvatar, sellerController.updateSeller)
  .post("/refreshToken", sellerController.refreshToken)

module.exports = router;