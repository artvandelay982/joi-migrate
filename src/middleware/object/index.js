const object = handlers => migration => {
  // invoke provided handlers for each object key
  Object.keys(handlers).forEach(key => {
    const result = handlers[key](migration[key], key, migration)
    if (result !== null && typeof result !== 'undefined') {
      migration[key] = result
    }
  })
}

object.key = require('./key')

module.exports = object