const app = require('./app')
const config = require('./utils/config')
const http = require('http') 

const server = http.createServer(app)
const nodeEnv = config.NODE_ENV.toUpperCase()

server.listen(config.PORT, () => {
    console.log(`${nodeEnv} server version ${config.SERVER_VERSION} running from port ${config.PORT}`)
})