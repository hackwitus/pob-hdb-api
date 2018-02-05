const fastify = require('fastify')()
const PORT = process.env.PORT || 5000

const inventoryRoutes = require('./routes/inventory')
fastify.register(inventoryRoutes)

fastify.listen(PORT, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log(`server listening on ${fastify.server.address().port}`)
  console.log(fastify.printRoutes())
})