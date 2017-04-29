const joi = require('joi')
const should = require('should')

const migrate = require('../src')

describe('Joi Migrate Tests', () => {
  it('Migrates a string schema to a number schema', () => {
    const toSchema = joi.number()
    const fromSchema = joi.string()

    const to = toSchema
    const from = '1'
    const middleware = migrate.middleware.number()
    
    const result = migrate({ to, from, middleware })

    result.should.be.an.Object()

    should.not.exist(result.error)

    result.should.have.a.property('value')
    result.value.should.equal(1)
  })

  describe('Object Middleware', () => {
    it('Migrates an object schema', () => {
      const toSchema = joi.object().keys({
        val1: joi.string(),
        val2: joi.number()
      })
      const fromSchema = joi.object().keys({
        val1: joi.number(),
        val2: joi.string()
      })

      const to = toSchema
      const from = {
        val1: 1,
        val2: '1'
      }

      const handlers = {
        val1: migrate.middleware.string(),
        val2: migrate.middleware.number()
      }
      const middleware = migrate.middleware.object(handlers)

      const result = migrate({ to, from, middleware })
      
      result.should.be.an.Object()

      should.not.exist(result.error)

      result.should.have.a.property('value')

      result.value.should.deepEqual({
        val1: '1',
        val2: 1
      })
    })

    it('Moves an object key', () => {
      const toSchema = joi.object().keys({
        val2: joi.string()
      })
      const fromSchema = joi.object().keys({
        val1: joi.string()
      })
      
      const to = toSchema
      const from = { val1: '1' }

      const val1 = migrate.middleware
        .object
        .key
        .move('val2')

      const middleware = migrate.middleware.object({ val1 })

      const result = migrate({ to, from, middleware })

      result.should.be.an.Object()

      should.not.exist(result.error)

      result.should.have.a.property('value')

      result.value.should.deepEqual({
        val2: '1'
      })
    })

    it('Fills an empty object key', () => {
      const toSchema = joi.object().keys({
        name: joi.string().required(),
        email: joi.string().required()
      })
      const fromSchema = joi.object().keys({
        name: joi.string().required()
      })

      const to = toSchema
      const from = { name: 'Herp Derpson' }

      const email = migrate.middleware.any.fill('legacy@example.com')
      const middleware = migrate.middleware.object({ email })

      const result = migrate({ to, from, middleware })

      result.should.be.an.Object()

      should.not.exist(result.error)

      result.should.have.a.property('value')

      result.value.should.deepEqual({
        name: 'Herp Derpson',
        email: 'legacy@example.com'
      })
    })
  })
})
