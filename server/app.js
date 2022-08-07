const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const db = require('./config/db')
const cors = require('cors')

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1/mylibrary', require('./routes/userRoutes'))
app.use('/api/v1/mylibrary/books', require('./routes/bookRoutes'))

app.get('/', (req, res) => {
    res.send("Home route")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server runnig on port => " + PORT)
    db.dbConnectinMethod()
})
