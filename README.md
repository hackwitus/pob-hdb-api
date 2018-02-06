POB HDB API

Inventory Item Record
```
hash_attribute: id
{
  id: (uuid/v1) String,
  name: String,
  available: Boolean,
  popularityScore: (uuid/v1) String,
  currentTransaction: (uuid/v1) String,
  transactionHistory: (Transaction:hash_attribute) Array
}
```

Transaction Record
```
hash_attribute: id
{
  id: (uuid/v1) String,
  item: (Item:hash_attribute) String,
  customer: (Customer:hash_attribute) String,
  collateral: String,
  timeBorrowed: (Date) String, 
  timeReturned: (Date) String
}
```

Customer Record
```
hash_attribute: id
{
  id: (uuid/v1) String,
  name: String,
  email: String,
  phoneNumber: String,
  transactionHistory: (Transaction:hash_attribute) Array
}
```

## Utility
Get id
```js
const uuidv1 = require('uuid/v1')
const id = uuidv1()
```

Get date
```js
const moment = require('moment')
const date = moment().format()
```

## REST API Endpoints
## GET
- /inventory
- /inventory/:id
- /inventory/available
- /inventory/current_transaction

- /transactions
- /transactions/:id
- /transactions/:customer
- /transactions/:item

- /customers/:id
- /customers/phone_number/:phoneNumber

## POST
- /inventory/new
- /inventory/update
- /inventory/delete

- /transactions/new
- /transactions/update
- /transactions/delete

- /customers/new
- /customers/update
- /customers/delete

## DB Requests

Create Schema
```
{
  "operation": "create_schema",
  "schema": "pob"
}
```

Create Tables
```
{
  "operation": "create_table",
  "schema": "pob",
  "table": "inventory",
  "hash_attribute": "id"
}

{
  "operation": "create_table",
  "schema": "pob",
  "table": "transactions",
  "hash_attribute": "id"
}

{
  "operation": "create_table",
  "schema": "pob",
  "table": "customers",
  "hash_attribute": "phoneNumber"
}
```

Insert Inventory Item
```
{
  "operation": "insert",
  "schema": "pob",
  "table": "inventory",
  "records": [
    {
      "id": "2ccdf25e-0ab1-11e8-ba89-0ed5f89f718b",
      "name": "Raspberry Pi 3",
      "available": "true",
      "currentTransaction": null,
      "transactionHistory": []
    }
  ]
}
```

Insert Transaction 
```
{
  "operation": "insert",
  "schema": "pob",
  "table": "transactions",
  "records": [
    {
      "id": "6fa2f6ba-0ab1-11e8-ba89-0ed5f89f718b",
      "item": "2ccdf25e-0ab1-11e8-ba89-0ed5f89f718b",
      "customer": "609-276-4043",
      "collateral": "Student ID",
      "timeBorrowed": "2018-02-05T15:21:18-05:00",
      "timeReturned": null
    }
  ]
}
```

Insert Customer
```
{
  "operation": "insert",
  "schema": "pob",
  "table": "customers",
  "records": [
    {
      "name": "Ethan Arrowood",
      "email": "ethan.arrowood@gmail.com",
      "phoneNumber": "609-276-4043",
      "transactionHistory": []
    }
  ]
}
```