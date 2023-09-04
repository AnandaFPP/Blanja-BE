const express = require("express");
const router = express.Router();
const productRouter = require('../routes/products')
const categoryRouter = require('../routes/category')
const customerRouter = require('../routes/customer')
const sellerRouter = require('../routes/seller')
const addressRouter = require('../routes/address')
const orderRouter = require('../routes/order')

router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/customer', customerRouter);
router.use('/seller', sellerRouter);
router.use('/address', addressRouter);
router.use('/order', orderRouter);

module.exports = router;