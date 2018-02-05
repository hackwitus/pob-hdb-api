const fastify = require('fastify')()
const PORT = process.env.PORT || 5000

const inventoryRoutes = require('./routes/inventory')
fastify.register(inventoryRoutes)

fastify.listen(PORT, function (err) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  fastify.log.info(`server listening on ${fastify.server.address().port}`)
  console.log(fastify.printRoutes())
})