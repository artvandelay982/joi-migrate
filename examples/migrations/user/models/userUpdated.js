const joi = require('joi')

module.exports = joi.object().keys({
  name: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required(),
  tagline: joi.string()
})
