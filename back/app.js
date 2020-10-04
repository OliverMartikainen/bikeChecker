const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const app = express()
const compression = require('compression')
const cors = require('cors')

const bikeDataRouter = require('./controllers/bikeData')
const middleware = require('./utils/middleware')

app.use(compression())
app.use(cors())

app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use(middleware.errorHandler)

app.use(express.static('build'))

app.use('/api/v1/bikeData', bikeDataRouter)

app.use(middleware.unknownEndpoint)

const Logger = require('./utils/logger')
console.log = Logger.consoleLogOverride
console.error = Logger.consoleErrorOverride


module.exports = app