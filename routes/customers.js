const { request, getID, getData } = require('./utility')

async function customersRoutes(fastify, options) {

  fastify.route({
    method: 'GET',
    url: '/customers',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "customers",
        "hash_attribute": "phoneNumber",
        "search_attribute": "phonerNumber",
        "search_value": "*",
        "get_attributes": ["name", "email", "phoneNumer", "transactionHistory"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/customers/:phoneNumber',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "customers",
        "hash_attribute": "phoneNumber",
        "search_attribute": "phoneNumber",
        "search_value": request.params.phoneNumber,
        "get_attributes": ["name", "email", "phoneNumer", "transactionHistory"]
      })

      return payload
    }
  })
}

module.exports = customersRoutes