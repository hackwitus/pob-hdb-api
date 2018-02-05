const fastify = require('fastify')()

const inventoryRoutes = require('./routes/inventory')
fastify.register(inventoryRoutes)

const start = async () => {
  try {
    await fastify.listen(5000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    console.log(fastify.printRoutes())
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()