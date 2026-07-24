const mongoose = require('mongoose')

const reviewsSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            require: true
        },
        rating: {
            type: Number,
            require: true,
             min: 1, 
            max: 5 
        },
        status:{
            type: String,
            default:"pending"
        },
        author: {
            type: String,
            require: true,
        }, 
        riskScore:{
            type: Number,
            require: true,
            min: 0, 
            max: 100 
        },    
           productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            require: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Reviews", reviewsSchema)