const Reviews = require("../models/reviews.model");
const generateRiskScore = require("../utils");

const createReviewsService = async (req, res) => {
    try {
        const {
            text,
            rating,
            author,
            productId
        } = req.body;

        const riskScore = generateRiskScore(text);

        const reviews = await Reviews.create({
            text,
            rating,
            author,
            productId,
            riskScore
        });

        return res.status(201).json({
            status: true,
            message: "Reviews created successfully",
            data: reviews
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

const getAllReviewsService = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            productId
        } = req.query;

        const skip = (page - 1) * limit;

        const reviews = await Reviews.find({
            productId: productId
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));
        const totalProducts = await Reviews.countDocuments();

        return res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            data: reviews,
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

const updateReviewsService = async (req, res) => {
    try {
        const riskScore = generateRiskScore(req.body.text);
        const data = {
            ...req.body,
            riskScore
        };

        const reviews = await Reviews.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $set: data
            },
            {
                new: true
            }
        );

        if (!reviews) {
            return res.status(404).json({
                status: false,
                message: "Reviews not found",
                data: null
            });
        }

        return res.status(200).json({
            status: true,
            message: "Reviews updated successfully",
            data: reviews
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};


const updateReviewsApproveService = async (req, res) => {
    try {
        const reviews = await Reviews.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $set: { status: "approve" }
            },
            {
                new: true
            }
        );
        if (!reviews) {
            return res.status(404).json({
                status: false,
                message: "Reviews not found",
                data: null
            });
        }
        return res.status(200).json({
            status: true,
            message: "Reviews updated successfully",
            data: reviews
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

const updateReviewsRejectService = async (req, res) => {
    try {
        const { reason } = req.body;
        const reviews = await Reviews.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $set: {
                    status: "reject",
                    rejectReason: reason || null
                }
            },
            {
                new: true
            }
        );
        if (!reviews) {
            return res.status(404).json({
                status: false,
                message: "Reviews not found",
                data: null
            });
        }
        return res.status(200).json({
            status: true,
            message: "Reviews updated successfully",
            data: reviews
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

const deleteReviewsService = async (req, res) => {
    try {
        const reviews = await Reviews.findOneAndDelete({
            _id: req.params.id,
        });

        if (!reviews) {
            return res.status(404).json({
                status: false,
                message: "Reviews not found",
                data: null
            });
        }

        return res.status(200).json({
            status: true,
            message: "Reviews deleted successfully",
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

const getAllScoreService = async (req, res) => {
    try {
        const {
            score_gt
        } = req.query;

        const reviews = await Reviews.find({
            riskScore: {
                $gte: score_gt
            }
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));
        const totalProducts = await Reviews.countDocuments();

        return res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            data: reviews,
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

module.exports = {
    createReviewsService,
    getAllReviewsService,
    updateReviewsService,
    updateReviewsApproveService,
    updateReviewsRejectService,
    getAllScoreService,
    deleteReviewsService
};