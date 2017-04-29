/* * * * * * * * EXAMPLE OF A JOI MIGRATION * * * * * * * *
*                                                         *
*          Converts userModel schema data into a          *
*       valid userModelUpdated schema and prints          *
*       both sets of data upon completion                 *
*                                                         *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const joi = require('joi')
const migrate = require('../../../src')

// use migration middleware to migrate
// old schema data to the new schema
const { middleware } = migrate

// v1 schema
const userModel = require('./models/user')

// v2 schema
const userModelUpdated = require('./models/userUpdated')

// v1 data to migrate
const usersData = require('./data/users_v1')

// set email with legacy filler data
const email = middleware.any.fill('legacy@example.com')
const migration = middleware.object({ email })

// migrate to the updated schema
const to = userModelUpdated
const migratedUsersData = usersData
  // migrate each record
  .map(from => migrate({ to, from, middleware: migration }))
  // map joi validation value
  .map(mig => mig.value)

console.log('--------------------------------------------------------------------------')
console.log('-------------------------  JOI MIGRATION RESULT  -------------------------')
console.log('--------------------------------------------------------------------------\n')
console.log('ORIGINAL DATA:\n', usersData)
console.log('\nMIGRATED DATA:\n', migratedUsersData)
