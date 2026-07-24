const express = require("express");
const router = express.Router();

const {
    createReviewsController,
    getAllReviewsController,
    updateReviewsApproveController,
    updateReviewsRejectController,
    updateReviewsController,
    getAllScoreController
} = require("../controllers/reviews.controllers");


router.get("/", getAllReviewsController);
router.post("/", createReviewsController);
router.put("/:id", updateReviewsController);
router.patch("/:id/approve", updateReviewsApproveController);
router.patch("/:id/reject", updateReviewsRejectController);
router.get("/flagged", getAllScoreController);

module.exports = router;