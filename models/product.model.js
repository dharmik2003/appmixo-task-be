const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        description: String,
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Products", productSchema)