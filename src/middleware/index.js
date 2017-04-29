/* Joi Migrate Middleware */

// generic number cast
const number = () => value => Number(value)

// generic string cast
const string = () => value => String(value)

const any = require('./any')
const object = require('./object')

module.exports = {
  any,
  number,
  object,
  string
}