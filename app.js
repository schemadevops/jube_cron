require('dotenv').config()
const port = process.env.PORT
const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')
const morgan = require("morgan");

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
app.use(errorHandler)

// if route doesnt exist
app.use((req, res) => {
    res.status(404).json({
        message: `Oops, the url you are looking for does not exist.`,
        status: 404
    })
})

app.listen(port, () => {
    console.log(`Server Listen at : ${port}`)
})
