const rp = require('request-promise-native')
const uuidv1 = require('uuid/v1')

async function inventoryRoutes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/api-test',
    handler: async (request, reply) => {
      reply.send({hello: 'world'})
    }
  })
}

module.exports = inventoryRoutes