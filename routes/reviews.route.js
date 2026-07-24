const express = require("express");
const router = express.Router();

const {
    createReviewsController,
    getAllReviewsController,
    updateReviewsApproveController,
    updateReviewsRejectController,
    updateReviewsController,
    getAllScoreController,
    deleteReviewsController
} = require("../controllers/reviews.controllers");

const validateRequest = require("../middlewares/validate");
const { 
    createReviewSchema, 
    updateReviewSchema, 
    rejectReviewSchema 
} = require("../validators/reviews.validator");


router.get("/", getAllReviewsController);
router.post("/", validateRequest(createReviewSchema), createReviewsController);
router.put("/:id", validateRequest(updateReviewSchema), updateReviewsController);
router.patch("/:id/approve", updateReviewsApproveController);
router.patch("/:id/reject", validateRequest(rejectReviewSchema), updateReviewsRejectController);
router.delete("/:id", deleteReviewsController);
router.get("/flagged", getAllScoreController);

module.exports = router;