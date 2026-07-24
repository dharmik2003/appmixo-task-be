const reviewsService = require("../services/reviews.services");

const createReviewsController = async (req, res) => {
    try {
        await reviewsService.createReviewsService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};



const getAllReviewsController = async (req, res) => {
    try {
        await reviewsService.getAllReviewsService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

const updateReviewsController = async (req, res) => {
    try {
        await reviewsService.updateReviewsService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};


const updateReviewsApproveController = async (req, res) => {
    try {
        await reviewsService.updateReviewsApproveService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};
const updateReviewsRejectController = async (req, res) => {
    try {
        await reviewsService.updateReviewsRejectService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};

const getAllScoreController = async (req, res) => {
    try {
        await reviewsService.getAllScoreService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};
const deleteReviewsController = async (req, res) => {
    try {
        await reviewsService.deleteReviewsService(req, res);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};



module.exports = {
    createReviewsController,
    getAllReviewsController,
    updateReviewsController,
    updateReviewsApproveController,
    updateReviewsRejectController,
    getAllScoreController,
    deleteReviewsController
};