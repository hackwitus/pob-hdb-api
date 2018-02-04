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
hash_attribute: phoneNumber
{
  name: String,
  email: String,
  phoneNumber: String,
  transactionHistory: (Transaction:hash_attribute) Array
}
```