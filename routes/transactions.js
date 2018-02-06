const { requestDB, getID, getDate } = require('./utility')

async function transactionsRoutes(fastify, options) {

  fastify.route({
    method: 'GET',
    url: '/transactions',
    handler: async (request, reply) => {
      const getTransactions = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": "*",
        "get_attributes": ["id", "item", "customer", "collateral", "timeBorrowed", "timeReturned"]
      })

      return getTransactions
    }
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/:id',
    handler: async (request, reply) => {
      const getTransactions = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "id",
        "search_value": request.params.id,
        "get_attributes": ["id", "item", "customer", "collateral", "timeBorrowed", "timeReturned"]
      })

      return getTransactions
    }
  })

  fastify.route({
    method: 'GET',
    url: '/transactions/customer/:phoneNumber',
    handler: async (request, reply) => {
      const getTransactions = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "customer",
        "search_value": request.params.phoneNumber,
        "get_attributes": ["id", "item", "customer", "collateral", "timeBorrowed", "timeReturned"]
      })

      return getTransactions
    }
  })
  
  fastify.route({
    method: 'GET',
    url: '/transactions/item/:id',
    handler: async (request, reply) => {
      const getTransactions = await requestDB({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "transactions",
        "hash_attribute": "id",
        "search_attribute": "item",
        "search_value": request.params.id,
        "get_attributes": ["id", "item", "customer", "collateral", "timeBorrowed", "timeReturned"]
      })

      return getTransactions
    }
  })

  fastify.route({
    method: 'POST',
    url: '/transactions/new',
    handler: async (request, reply) => {

      const newTransactionId = getID()

      try {
        const lookUpCustomer = await requestDB({
          "operation": "search_by_hash",
          "schema": "pob",
          "table": "customers",
          "hash_attribute": "phoneNumber",
          "hash_values":[ request.body.customer.phoneNumber ],
          "get_attributes": ["name", "email", "phoneNumber", "transactionHistory"]
        })
  
        const lookUpInventory = await requestDB({
          "operation": "search_by_value",
          "schema": "pob",
          "table": "inventory",
          "hash_attribute": "id",
          "search_attribute": "id",
          "search_value": request.body.item,
          "get_attributes": ["id", "name", "available"]
        })

        const currentTransactionHistory = lookUpInventory[0].transactionHistory
        const newTransactionHistory = currentTransactionHistory ?
          [ ...currentTransactionHistory, newTransactionId ]
          : [ newTransactionId ]

        const updateInventory = await requestDB({
          "operation": "update",
          "schema": "pob",
          "table": "inventory",
          "records": [
            {
              "id": request.body.item,
              "available": "false",
              "currentTransaction": newTransactionId,
              "transactionHistory": newTransactionHistory
            }
          ]
        })

        let newCustomer, updateCustomer
  
        if ( lookUpCustomer.length === 0 ) {
          newCustomer = await requestDB({
            "operation": "insert",
            "schema": "pob",
            "table": "customers",
            "records": [
              {
                "name": request.body.customer.name,
                "email": request.body.customer.email,
                "phoneNumber": request.body.customer.phoneNumber,
                "transactionHistory": [newTransactionId]
              }
            ]
          })
        } else {
          updateCustomer = await requestDB({
            "operation": "update",
            "schema": "pob",
            "table": "customers",
            "records": [
              {
                "phoneNumber": request.body.customer.phoneNumber,
                "transactionHistory": [ ...lookUpCustomer[0].transactionHistory, newTransactionId ]
              }
            ]
          })
        }
        
        const payload = await requestDB({
          "operation": "insert",
          "schema": "pob",
          "table": "transactions",
          "records": [
            {
              "id": newTransactionId,
              "item": request.body.item,
              "customer": request.body.customer.phoneNumber,
              "collateral": request.body.collateral,
              "timeBorrowed": getDate(),
              "timeReturned": null
            }
          ]
        })

        return payload
      } catch (error) {
        return error
      }
    }
  })

  fastify.route({
    method: 'POST',
    url: '/transactions/update',
    handler: async (request, reply) => {
      try {
        const lookUpTransaction = await requestDB({
          "operation": "search_by_value",
          "schema": "pob",
          "table": "transactions",
          "hash_attribute": "id",
          "search_attribute": "id",
          "search_value": request.body.transaction,
          "get_attributes": ["id", "item"]
        })

        const lookUpInventory = await requestDB({
          "operation": "search_by_value",
          "schema": "pob",
          "table": "inventory",
          "hash_attribute": "id",
          "search_attribute": "id",
          "search_value": lookUpTransaction[0].item,
          "get_attributes": ["id", "name", "available"]
        })

        const updateInventory = await requestDB({
          "operation": "update",
          "schema": "pob",
          "table": "inventory",
          "records": [
            {
              "id": lookUpTransaction[0].item,
              currentTransaction: null,
              available: "true",
            }
          ]
        })

        const updateTransaction = await requestDB({
          "operation": "update",
          "schema": "pob",
          "table": "transactions",
          "records": [
            {
              "id": request.body.transaction,
              "timeReturned": getDate()
            }
          ]
        })

        return updateTransaction
      } catch (error) {
        return error
      }
    }
  })

  fastify.route({
    method: 'POST',
    url: '/transactions/delete',
    handler: async (request, reply) => {

      const deleteTransaction = await requestDB({
        "operation": "delete",
        "schema": "pob",
        "table": "transactions",
        "hash_values": [request.body.transaction]
      })

      return deleteTransaction
    }
  })
}

module.exports = transactionsRoutes