const { requestDB, getID, getData } = require('./utility')

async function inventoryRoutes(fastify, options) {

  fastify.route({
    method: 'GET',
    url: '/inventory',
    handler: async (request, reply) => {
      const getInventory = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value":"*",
        "get_attributes": ["id", "name", "description", "available", "currentTransaction", "transactionHistory"]
      })

      return getInventory
    }
  })

  fastify.route({
    method: 'GET',
    url: '/inventory/:id',
    handler: async (request, reply) => {
      const getInventory = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": request.params.id,
        "get_attributes": ["name", "id", "description", "available", "currentTransaction", "transactionHistory"]
      })

      return getInventory
    }
  })
  
  fastify.route({
    method: 'GET',
    url: '/inventory/available',
    handler: async (request, reply) => {
      const getInventory = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "available",
        "search_value": "true",
        "get_attributes": ["name", "id", "description", "available", "currentTransaction", "transactionHistory"]
      })

      return getInventory
    }
  })

  fastify.route({
    method: 'GET',
    url: '/inventory/current_transaction/:id',
    handler: async (request, reply) => {
      const getInventory = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "currentTransaction",
        "search_value": request.params.id,
        "get_attributes": ["name", "id", "description", "available", "currentTransaction", "transactionHistory"]
      })

      return getInventory
    }
  })

  fastify.route({
    method: 'POST',
    url: '/inventory/new',
    handler: async (request, reply) => {
      const newInventory = await requestDB({
        "operation": "insert",
        "schema": "pob",
        "table": "inventory",
        "records": [
          {
            "id": getID(),
            "name": request.body.name,
            "description": request.body.description || "Default description",
            "available": "true",
            "currentTransaction": null,
            "transactionHistory": []
          }
        ]
      })

      return newInventory
    }
  })

  fastify.route({
    method: 'POST',
    url: '/inventory/update',
    handler: async (request, reply) => {
      const currentRecord = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "inventory",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": request.body.id,
        "get_attributes": ["name", "id", "description"]
      })

      const updateInventory = await requestDB({
        "operation": "update",
        "schema": "pob",
        "table": "inventory",
        "records": [
          {
            "id": request.body.id,
            "name": request.body.name || currentRecord[0].name,
            "description": request.body.description || currentRecord[0].description,
          }
        ]
      })

      return updateInventory
    }
  })

  fastify.route({
    method: 'POST',
    url: '/inventory/delete',
    handler: async (request, reply) => {
      const deleteInventory = await requestDB({
        "operation": "delete",
        "schema": "pob",
        "table": "inventory",
        "hash_values": [ request.body.id ] 
      })

      return deleteInventory
    }
  })
}

module.exports = inventoryRoutes