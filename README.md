# Joi Migrate

### Migrate Joi Data between schemas with migration midleware.

## Usage
```javascript
const joi = require('joi')
const migrate = require('joi-migrate')

// migration target schema
const to = joi.number().required()

// data to migrate
const from = '123'

// this middleware will attempt
// to cast migrate(from) to a number
const middleware = migrate.middleware.number()

const result = migrate({ to, from, middleware })
console.log(result)
// { error: null, value: 123 }
```

## Advanced

### Migrations can be performed perhaps most usefully on objects:
```javascript
const joi = require('joi')
const migrate = require('joi-migrate')

// updated user model
// now with email!
const userModelUpdated = joi.object().keys({
  name: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required()
})

// previous model
const userModelLegacy = joi.object().keys({
  name: joi.string().required(),
  password: joi.string().required()
})

// Jim has been a user for years
// he'll never want to give us his email!
const userRecordLegacy = {
  name: 'Jim',
  password: 'We do not hash!'
}

// fill in a fake email
// for this legacy user
const email = migrate
  .middleware
  .any
  .fill('legacy@example.com')

// add email handler
// to migration
const middleware = migrate
  .middleware
  .object({ email })

const to = userModelUpdated
const from = userRecordLegacy

const userRecordUpdated = migrate({ to, from, middleware })
console.log(userRecordUpdated)
/*
  {
    error: null,
    value: {
      name: 'Jim',
      password: 'We do not hash!',
      email: 'legacy@example.com'
    }
  }
*/
```

## More

Docs to follow