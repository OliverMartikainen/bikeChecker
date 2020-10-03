/** @returns {String} Local current time iso string */
const dateNow = () => localISOString(new Date())

/**
 * @returns {String} YYYY-MM-DD for local time 
 */
const localDateIso = () => dateNow().slice(0, 10)

/**
 * Give date object, get localTimezone toISOString()
 * @param {Object} date --> Date object
 * @returns {String} localISOString
 */
const localISOString = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000)).toISOString()
}


module.exports = {
    dateNow,
    localISOString,
    localDateIso
}