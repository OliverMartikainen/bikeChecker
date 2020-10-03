const { LOGGING_TYPE } = require('./config')
const { dateNow } = require('./dateTime')

const timeStamper = () => {
    const [isoDate, isoTime] = dateNow().slice(0, 23).replace('-', '.').replace('-', '.').split('T')
    return `${isoDate} ${isoTime}`
}

let defaultLog = console.log
const consoleLogOverride = (...params) => {
    const localDateIsoString = colorMsg(`[${timeStamper()}]`, 'CYAN')
    const newArgs = [localDateIsoString, ...params]
    defaultLog.apply(console, newArgs)
}

let defaultError = console.error
const consoleErrorOverride = (...params) => {
    const localDateIsoString = colorMsg(`[${timeStamper()}]`, 'RED')
    const newArgs = [localDateIsoString, ...params]
    defaultError.apply(console, newArgs)
}

//console.log color codes
const COLORS = {
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    MAGENTA: '\x1b[35m',
    CYAN: '\x1b[36m',
    WHITE: '\x1b[37m',
    RESET: '\x1b[0m'
}


/**
 * Highlight part of console.log --> console.log/timedLog(` text ${colorMsg('red', 'string text')} rest of text`)
 * !! WILL PROBABLY NOT WORK ONCE LOGGING IS TO TXT FILE AND NOT CONSOLE !! - check node.env?
 * @param {String} color red, green, yellow, blue, magenta, cyan (supported colors, 
 * unsupported just return msg with console default color)
 * @param {String} msg string that will be colored in log
 * @returns {String} `${colorCode}${msg}${colorResetCode}`
 */
const colorMsg = (msg, color) => {
    //'text' log type would just output the color codes. Work only in console log
    if (LOGGING_TYPE !== 'console') return msg

    const colorUpper = color.toUpperCase()
    const startColor = COLORS[colorUpper]
    if (!startColor) return msg
    return `${startColor}${msg}${COLORS.RESET}`
}


module.exports = {
    consoleLogOverride,
    consoleErrorOverride,
    colorMsg
}