const express = require('express')
const router = express.Router()
const Products = require("./product.route")
const Reviews = require("./reviews.route")

router.use('/products', Products)
router.use('/reviews', Reviews)


module.exports = router