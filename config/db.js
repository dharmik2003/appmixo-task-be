const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Done Connected DB")
    } catch (error) {
        console.log("Error", error)
    }
}

module.exports = connectDB