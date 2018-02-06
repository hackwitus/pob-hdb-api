const rp = require('request-promise-native')
const uuidv1 = require('uuid/v1')

async function inventoryRoutes(fastify, options) {
  function request({ options }) {
    return rp({
      method: 'POST',
      url: process.env.HDB_URL,
      headers: {
        "content-type":"application/json",
        "authorization": 'Basic ' + new Buffer(process.env.HDB_USERNAME + ':' + process.env.HDB_PASSWORD).toString('base64')
      },
      body: options,
      json: true
    })
  }
  function getID() {
    return uuidv1()
  }
  function getDate() {
    return moment().format()
  }

  fastify.route({
    method: 'GET',
    url: '/inventory',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value":"*",
        "get_attributes": ["name", "id", "available", "currentTransaction", "transactionHistory"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/inventory/:id',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": request.params.id,
        "get_attributes": ["name", "id", "available", "currentTransaction", "transactionHistory"]
      })

      return payload
    }
  })
  
  fastify.route({
    method: 'GET',
    url: '/inventory/available',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "available",
        "search_value": "true",
        "get_attributes": ["name", "id", "available", "currentTransaction", "transactionHistory"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/inventory/current_transaction/:id',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "currentTransaction",
        "search_value": request.params.id,
        "get_attributes": ["name", "id", "available", "currentTransaction", "transactionHistory"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/transactions',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": "*",
        "get_attributes": ["id", "item", "customer", "collateral", "timeBorrowed", "timeReturned"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/:id',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": request.params.id,
        "get_attributes": ["id", "item", "customer", "collateral", "timeBorrowed", "timeReturned"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/customer/:id',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "customer",
        "search_value": request.params.id,
        "get_attributes": ["id", "item", "customer", "collateral", "timeBorrowed", "timeReturned"]
      })

      return payload
    }
  })
  
  fastify.route({
    method: 'GET',
    url: '/transactions/item/:id',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "item",
        "search_value": request.params.id,
        "get_attributes": ["id", "item", "customer", "collateral", "timeBorrowed", "timeReturned"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/customers/:id',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "customers",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": request.params.id,
        "get_attributes": ["id", "name", "email", "phoneNumer", "transactionHistory"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/customers/phone_number/:phoneNumber',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "customers",
        "hash_attribute": "id",
        "search_attribute": "phoneNumber",
        "search_value": request.params.phoneNumber,
        "get_attributes": ["id", "name", "email", "phoneNumer", "transactionHistory"]
      })

      return payload
    }
  })
}

module.exports = inventoryRoutes