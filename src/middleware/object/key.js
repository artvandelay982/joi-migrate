const key = module.exports = {}

// move a key to a new a value
// and delete the original
key.move = to => (value, from, migration) => {
  migration[to] = value
  delete migration[from]
}
