const { z } = require("zod");

const createReviewSchema = z.object({
    body: z.object({
        text: z.string({ required_error: "Text is required" }),
        rating: z.number({ required_error: "Rating is required" }).min(1).max(5),
        author: z.string({ required_error: "Author is required" }),
        productId: z.string({ required_error: "Product ID is required" })
    })
});

const updateReviewSchema = z.object({
    body: z.object({
        text: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        author: z.string().optional(),
        productId: z.string().optional()
    }),
    params: z.object({
        id: z.string({ required_error: "Review ID is required" })
    })
});

const rejectReviewSchema = z.object({
    body: z.object({
        reason: z.string({ required_error: "Rejection reason is required" }).min(1, "Reason cannot be empty")
    }),
    params: z.object({
        id: z.string({ required_error: "Review ID is required" })
    })
});

module.exports = {
    createReviewSchema,
    updateReviewSchema,
    rejectReviewSchema
};
