const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1/mylibrary',userRoutes)

app.get('/', (req, res) => {
    res.send("Home route")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server runnig on port => " + PORT)
    db.dbConnectinMethod()
})
