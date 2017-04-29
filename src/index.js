const joi = require('joi')

// migrate a joi object
// from an old schema
// to a new schema
const migrate = module.exports = migration => {
  const { to, from, middleware } = migration
  if (middleware) middleware(from)
  return to.validate(from)
}

// migration middleware
migrate.middleware = require('./middleware')
