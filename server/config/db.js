const mongoose = require('mongoose')
const dbConnection = process.env.MONGO_URI

const dbConnectinMethod = async () => {
    try {
        await mongoose.connect(dbConnection)
        console.log("Db connected")
    } catch (error) {
        console.log("Error")
        process.exit(1)
    }
}

module.exports = { dbConnectinMethod }