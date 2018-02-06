POB HDB API

Inventory Item Record
```
hash_attribute: id
{
  id: (uuid/v1) String,
  name: String,
  description: String,
  available: Boolean,
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
hash_attribute: phoneNumber
{
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
- /inventory `/inventory`
  - get all items in the inventory
  - Example `/inventory`:
  ```js
    [
      {
        "id": "6fa2f6ba-0ab1-11e8-ba89-0ed5f89f718b", 
        "name": "Arduino Uno",
        "available": "true",
        "currentTransaction": null,
        "transactionHistory": []
      },
      {
        "id": "2ccdf25e-0ab1-11e8-ba89-0ed5f89f718b", 
        "name": "Raspberry Pi 3",
        "available": "true",
        "currentTransaction": null,
        "transactionHistory": []
      },
      ...
    ]
  ```
- /inventory/:id 
  - get a singular item specified by the unique `id`
  - Example `/inventory/6fa2f6ba-0ab1-11e8-ba89-0ed5f89f718b`:
  ```js
    [
      {
        "id": "6fa2f6ba-0ab1-11e8-ba89-0ed5f89f718b", 
        "name": "Arduino",
        "available": "true",
        "currentTransaction": null,
        "transactionHistory": []
      }
    ]
  ```
- /inventory/available
  - get all available items
- /inventory/current_transaction/:id
  - get an item with a specified transaction `id`
- /transactions
  - get all transactions
- /transactions/:id
  - get transaction specified by the unique `id`
- /transactions/customer/:phoneNumber
  - get transaction(s) with a specified customer `phoneNumber`
- /transactions/item/:id
  - get transaction(s) with a specified item `id`
- /customers/
  - get all customers
- /customers/:phoneNumber
  - get customer specified by the unique `phoneNumber`

## POST
- /inventory/new
  - creates new `inventory` record
- /inventory/update
  - updates `inventory:name`
  - updates `inventory:description`
- /inventory/delete
  - deletes `inventory:id`
- /transactions/new
  - creates new `transactions` record
  - updates `inventory:available`
  - updates `inventory:currentTransaction`
  - updates `inventory:transactionHistory`
  - if customer exists:
    - creates new `customer`
  - else:
    - updates `customer:transactionHistory`
- /transactions/update
  - updates `transaction:timeReturned`
  - updates `inventory:available`
- /transactions/delete
  - deletes `transaction:id`
- /customers/new
  - creates new `customers`
- /customers/update
  - updates `customer:name`
  - updates `customer:email`
- /customers/delete
  - deletes `customer:id`

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
  "hash_attribute": "id"
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
      "description": "Mini computer thingy majigy"
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