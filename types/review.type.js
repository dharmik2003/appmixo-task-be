const { z } = require('zod');
const mongoose = require('mongoose');

const reviewsZodSchema = z.object({
  text: z
    .string({ required_error: "Text is required" })
    .min(1, "Text cannot be empty"),
    
  rating: z
    .number({ required_error: "Rating is required" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
    
  status: z
    .string()
    .default("pending"),
    
  author: z
    .string({ required_error: "Author is required" })
    .min(1, "Author name cannot be empty"),
    
  riskScore: z
    .number({ required_error: "Risk score is required" })
    .min(0, "Risk score must be at least 0")
    .max(100, "Risk score cannot be more than 100"),
    
  productId: z
    .string({ required_error: "Product ID is required" })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Product MongoDB ObjectId",
    }),
});

module.exports = { reviewsZodSchema };