require('dotenv').config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db");
const routes = require("./routes/index")

const app = express()
connectDB();

app.use(cors())
app.use(express.json())

app.use('/api', routes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server is running...")
})