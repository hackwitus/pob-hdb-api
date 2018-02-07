const fastify = require('fastify')({ logger: { prettyPrint: true } })
const PORT = process.env.PORT || 5000
const inventoryRoutes = require('./routes/inventory')
const transactionsRoutes = require('./routes/transactions')
const customersRoutes = require('./routes/customers')
fastify
  .use(require('cors')())
  .register(inventoryRoutes)
  .register(transactionsRoutes)
  .register(customersRoutes)

fastify.listen(PORT, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log(`server listening on ${fastify.server.address().port}`)
  console.log(fastify.printRoutes())
})