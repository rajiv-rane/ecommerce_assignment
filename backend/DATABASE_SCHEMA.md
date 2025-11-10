# Database Schema Documentation

## Overview

MongoDB Atlas is a schema-less database, but our Mongoose models define the structure. This document describes the collections and their schemas that will be created automatically when you run the application.

## Database Name

The database name is determined by your MongoDB connection string. By default, it will be `ecommerce` or whatever you specify in the connection string.

## Collections

The application uses **2 main collections**:

1. **products** - Stores product information
2. **orders** - Stores order information

---

## Collection: `products`

### Schema Structure

```typescript
{
  name: String (required, trimmed)
  description: String (required)
  price: Number (required, min: 0)
  image: String (required) // URL to product image
  category: String (required, enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'])
  brand: String (optional, trimmed)
  inStock: Boolean (default: true)
  stockCount: Number (default: 0, min: 0)
  rating: Number (default: 0, min: 0, max: 5)
  numReviews: Number (default: 0)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Wireless Headphones Pro",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 199.99,
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  "category": "Electronics",
  "brand": "AudioTech",
  "inStock": true,
  "stockCount": 50,
  "rating": 4.5,
  "numReviews": 120,
  "createdAt": ISODate("2024-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00.000Z")
}
```

### Indexes (Recommended)

MongoDB will automatically create an index on `_id`. For better performance, you can create additional indexes:

```javascript
// In MongoDB Atlas or using Mongoose:
db.products.createIndex({ category: 1 })
db.products.createIndex({ price: 1 })
db.products.createIndex({ rating: -1 })
db.products.createIndex({ name: "text", description: "text", brand: "text" }) // Text search
```

---

## Collection: `orders`

### Schema Structure

```typescript
{
  orderItems: [
    {
      product: ObjectId (ref: 'Product', required)
      name: String (required)
      image: String (required)
      price: Number (required)
      quantity: Number (required, min: 1)
    }
  ],
  shippingAddress: {
    fullName: String (required)
    address: String (required)
    city: String (required)
    postalCode: String (required)
    country: String (required)
  },
  paymentMethod: String (required, enum: ['Credit Card', 'PayPal', 'Cash on Delivery'])
  itemsPrice: Number (required)
  shippingPrice: Number (required, default: 0)
  taxPrice: Number (required, default: 0)
  totalPrice: Number (required)
  isPaid: Boolean (default: false)
  isDelivered: Boolean (default: false)
  paidAt: Date (optional)
  deliveredAt: Date (optional)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "orderItems": [
    {
      "product": ObjectId("507f1f77bcf86cd799439011"),
      "name": "Wireless Headphones Pro",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "price": 199.99,
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "Credit Card",
  "itemsPrice": 399.98,
  "shippingPrice": 10.00,
  "taxPrice": 40.00,
  "totalPrice": 449.98,
  "isPaid": true,
  "isDelivered": false,
  "paidAt": ISODate("2024-01-01T12:00:00.000Z"),
  "createdAt": ISODate("2024-01-01T12:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T12:00:00.000Z")
}
```

### Indexes (Recommended)

```javascript
db.orders.createIndex({ createdAt: -1 })
db.orders.createIndex({ "shippingAddress.fullName": 1 })
db.orders.createIndex({ isPaid: 1, isDelivered: 1 })
```

---

## Database Setup in MongoDB Atlas

### Step 1: Create Database

1. Go to your MongoDB Atlas cluster
2. Click "Browse Collections"
3. The database will be created automatically when the first document is inserted
4. Database name comes from your connection string (default: `ecommerce`)

### Step 2: Collections Creation

Collections are created automatically when:
- You run the seed script (`npm run seed`) → creates `products` collection
- A user places an order → creates `orders` collection

### Step 3: Verify Schema

After running the seed script, you can verify in MongoDB Atlas:

1. Go to "Browse Collections"
2. Click on your database
3. You should see the `products` collection
4. Click on it to see the documents

---

## Schema Validation (Optional)

MongoDB Atlas allows you to add schema validation rules. However, since we're using Mongoose, validation is handled at the application level. If you want to add database-level validation:

### Example Validation Rules

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["name", "description", "price", "image", "category"],
    "properties": {
      "name": {
        "bsonType": "string",
        "description": "must be a string and is required"
      },
      "price": {
        "bsonType": "double",
        "minimum": 0,
        "description": "must be a number >= 0 and is required"
      },
      "category": {
        "enum": ["Electronics", "Clothing", "Books", "Home", "Sports", "Toys"],
        "description": "can only be one of the enum values and is required"
      }
    }
  }
}
```

**Note:** Mongoose already handles validation, so database-level validation is optional.

---

## Data Types Reference

| Field Type | MongoDB Type | Description |
|------------|-------------|-------------|
| String | string | Text data |
| Number | double/int32 | Numeric data |
| Boolean | bool | true/false |
| Date | date | Timestamp |
| ObjectId | objectId | Reference to another document |
| Array | array | List of items |
| Object | object | Embedded document |

---

## Relationships

- **Orders → Products**: One-to-Many relationship
  - `orderItems[].product` references `products._id`
  - Can be populated using Mongoose `.populate()`

---

## Sample Data

After running `npm run seed`, you'll have:
- **30 products** across 6 categories
- Products generated using Faker.js with realistic data
- All products will have images, prices, ratings, etc.

---

## Query Examples

### Find all Electronics products
```javascript
db.products.find({ category: "Electronics" })
```

### Find products in price range
```javascript
db.products.find({ price: { $gte: 100, $lte: 500 } })
```

### Find orders by customer name
```javascript
db.orders.find({ "shippingAddress.fullName": "John Doe" })
```

### Find unpaid orders
```javascript
db.orders.find({ isPaid: false })
```

---

## Summary

- **Database**: `ecommerce` (or as specified in connection string)
- **Collections**: `products`, `orders`
- **Schema**: Defined by Mongoose models
- **Validation**: Handled by Mongoose at application level
- **Indexes**: Recommended for performance (category, price, rating, etc.)
- **Relationships**: Orders reference Products via ObjectId

No manual schema creation needed - everything is handled automatically by Mongoose!

