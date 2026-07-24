const productService = require("../services/product.services");

// Create Product
const createProductController = async (req, res) => {
    try {
        await productService.createProductService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};


// Get All Products (logged-in user)
const getAllProductsController = async (req, res) => {
    try {
        await productService.getAllProductsService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};


// Get Single Product
const getSingleProductController = async (req, res) => {
    try {
        await productService.getSingleProductService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};


// Update Product
const updateProductController = async (req, res) => {
    try {
        await productService.updateProductService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};


// Delete Product
const deleteProductController = async (req, res) => {
    try {
        await productService.deleteProductService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

module.exports = {
    createProductController,
    getAllProductsController,
    getSingleProductController,
    updateProductController,
    deleteProductController
};