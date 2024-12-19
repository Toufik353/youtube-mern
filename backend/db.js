const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to mongoDB")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB