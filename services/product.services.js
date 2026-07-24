const Product = require("../models/product.model");

const createProductService = async (req, res) => {
    try {
        const {
            name,
            description,
            price
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price
        });

        return res.status(201).json({
            status: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

const getAllProductsService = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 5
        } = req.query;

        const skip = (page - 1) * limit;
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));
            console.log("products",products)

        const totalProducts = await Product.countDocuments();

        return res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            data: products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
                limit: Number(limit)
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

const getSingleProductService = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
        });
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found",
                data: null
            });
        }
        return res.status(200).json({
            status: true,
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};


const updateProductService = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $set: req.body
            },
            {
                new: true
            }
        );
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found",
                data: null
            });
        }
        return res.status(200).json({
            status: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

const deleteProductService = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
                });

        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found",
                data: null
            });
        }

        return res.status(200).json({
            status: true,
            message: "Product deleted successfully",
            data: null
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};



module.exports = {
    createProductService,
    getAllProductsService,
    getSingleProductService,
    updateProductService,
    deleteProductService
};