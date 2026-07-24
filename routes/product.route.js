const express = require("express");
const router = express.Router();

const {
    createProductController,
    getAllProductsController,
    getSingleProductController,
    updateProductController,
    deleteProductController
} = require("../controllers/product.controllers");


router.get("/", getAllProductsController);
router.post("/", createProductController);
router.get("/:id", getSingleProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

module.exports = router;