const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db.js')
const userRouter = require("./routers/user.router.js")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json()) 

connectDB()

app.use("/", userRouter)

app.use("/",require("./routers/video.router.js"))
app.listen(5005, () => {
    console.log('Server is running on port 5005')
})

