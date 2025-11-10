# Technical Architecture Document

## Overview

This document describes the technical architecture of the E-Commerce application, a full-stack web application built with React (TypeScript) and Node.js/Express (TypeScript).

## Requirements

### Functional Requirements

- Browse and search products
- View product details
- Add/remove/update items in shopping cart
- Checkout and place orders
- Cart persistence across sessions

### Non-Functional Requirements

- Responsive design for mobile and desktop
- Fast page load times
- Secure API endpoints
- Scalable architecture
- Comprehensive error handling
- Test coverage

## System Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Browser                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              React Frontend (Vite + TS)                 │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │
│  │  │  Pages   │  │ Components│  │  Context  │          │  │
│  │  └──────────┘  └──────────┘  └──────────┘          │  │
│  │         │              │              │              │  │
│  │         └──────────────┴──────────────┘              │  │
│  │                        │                              │  │
│  │              ┌─────────▼─────────┐                    │  │
│  │              │   API Service     │                    │  │
│  │              │     (Axios)       │                    │  │
│  │              └─────────┬─────────┘                    │  │
│  └────────────────────────┼──────────────────────────────┘  │
└───────────────────────────┼──────────────────────────────────┘
                            │ HTTP/REST
                            │
┌───────────────────────────▼──────────────────────────────────┐
│                    Express Backend (TS)                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    API Routes                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │  Products  │  │   Orders   │  │   Health   │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  └────────────────────────────────────────────────────────┘  │
│                        │                                      │
│              ┌─────────▼─────────┐                          │
│              │   Mongoose ODM     │                          │
│              └─────────┬─────────┘                          │
└────────────────────────┼──────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────┐
│                    MongoDB Atlas                               │
│  ┌──────────────┐          ┌──────────────┐                 │
│  │   Products   │          │    Orders    │                 │
│  │  Collection  │          │  Collection  │                 │
│  └──────────────┘          └──────────────┘                 │
└───────────────────────────────────────────────────────────────┘
```

### Component Architecture

#### Frontend Components

```
App
├── Navbar
│   └── CartBadge
├── Routes
│   ├── HomePage
│   │   ├── SearchBar
│   │   ├── FilterBar
│   │   └── ProductCard (list)
│   ├── ProductPage
│   │   └── ProductDetail
│   ├── CartPage
│   │   └── CartItem
│   └── CheckoutPage
│       └── OrderForm
└── CartProvider (Context)
    └── CartReducer
```

#### Backend Structure

```
server.ts
├── config/
│   └── db.ts
├── models/
│   ├── Product.ts
│   └── Order.ts
├── routes/
│   ├── productRoutes.ts
│   └── orderRoutes.ts
├── middleware/
│   └── errorHandler.ts
└── scripts/
    └── seed.ts
```

## API Routes

### Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-api-domain.com/api`

### Product Routes

#### GET /api/products

Get all products with filtering, sorting, and pagination.

**Query Parameters:**

- `search` (string, optional): Search in name, description, brand
- `category` (string, optional): Filter by category
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `sortBy` (string, optional): Sort option (`newest`, `price-low`, `price-high`, `rating`)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 12)

**Sample Request:**

```bash
GET /api/products?category=Electronics&minPrice=100&maxPrice=500&sortBy=price-low&page=1&limit=12
```

**Response:**

```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones...",
      "price": 199.99,
      "image": "https://images.unsplash.com/...",
      "category": "Electronics",
      "brand": "AudioTech",
      "inStock": true,
      "stockCount": 50,
      "rating": 4.5,
      "numReviews": 120,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "page": 1,
  "pages": 3,
  "total": 30
}
```

#### GET /api/products/:id

Get a single product by ID.

**Sample Request:**

```bash
GET /api/products/507f1f77bcf86cd799439011
```

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones...",
  "price": 199.99,
  "image": "https://images.unsplash.com/...",
  "category": "Electronics",
  "brand": "AudioTech",
  "inStock": true,
  "stockCount": 50,
  "rating": 4.5,
  "numReviews": 120
}
```

#### GET /api/products/categories/list

Get all available product categories.

**Response:**

```json
["Electronics", "Clothing", "Books", "Home", "Sports", "Toys"]
```

### Order Routes

#### POST /api/orders

Create a new order (mock checkout).

**Request Body:**

```json
{
  "orderItems": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "image": "https://images.unsplash.com/...",
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
  "paymentMethod": "Credit Card"
}
```

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "orderItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "Credit Card",
  "itemsPrice": 399.98,
  "shippingPrice": 10,
  "taxPrice": 40.00,
  "totalPrice": 449.98,
  "isPaid": true,
  "paidAt": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### GET /api/orders/:id

Get order details by ID.

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "orderItems": [...],
  "shippingAddress": {...},
  "totalPrice": 449.98,
  "isPaid": true,
  "isDelivered": false
}
```

### Health Check

#### GET /api/health

Check API health status.

**Response:**

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Data Models

### Product Model

```typescript
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Electronics' | 'Clothing' | 'Books' | 'Home' | 'Sports' | 'Toys';
  brand?: string;
  inStock: boolean;
  stockCount: number;
  rating: number; // 0-5
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}
```

**Mongoose Schema:**

- `name`: Required, trimmed string
- `description`: Required string
- `price`: Required, minimum 0
- `image`: Required string (URL)
- `category`: Required, enum of 6 categories
- `brand`: Optional, trimmed string
- `inStock`: Boolean, default true
- `stockCount`: Number, default 0, minimum 0
- `rating`: Number, default 0, range 0-5
- `numReviews`: Number, default 0
- `timestamps`: Automatic createdAt/updatedAt

### Order Model

```typescript
interface OrderItem {
  product: string; // Product ID
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Cash on Delivery';
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

**Mongoose Schema:**

- `orderItems`: Array of order item subdocuments
- `shippingAddress`: Embedded shipping address object
- `paymentMethod`: Required, enum of 3 options
- `itemsPrice`: Required number
- `shippingPrice`: Required number, default 0
- `taxPrice`: Required number, default 0
- `totalPrice`: Required number
- `isPaid`: Boolean, default false
- `isDelivered`: Boolean, default false
- `paidAt`: Optional date
- `deliveredAt`: Optional date
- `timestamps`: Automatic createdAt/updatedAt

## State Management

### Cart State (Frontend)

The cart state is managed using React Context API with a reducer pattern.

**State Structure:**

```typescript
interface CartState {
  items: CartItem[];
}

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
```

**Actions:**

- `LOAD_CART`: Load cart from localStorage
- `ADD_ITEM`: Add item to cart or increment quantity
- `REMOVE_ITEM`: Remove item from cart
- `UPDATE_QUANTITY`: Update item quantity
- `CLEAR_CART`: Clear all items from cart

**Persistence:**

- Cart state is automatically saved to `localStorage` whenever it changes
- Cart is loaded from `localStorage` on application mount
- Key: `'cart'`

**Hook:**

```typescript
const {
  items,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  getCartItemsCount,
} = useCart();
```

## Error Handling

### Backend Error Handling

**Error Middleware:**

- Catches all unhandled errors
- Returns appropriate HTTP status codes
- Logs errors in development
- Returns sanitized error messages in production

**Error Response Format:**

```json
{
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

**Status Codes:**

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

### Frontend Error Handling

**API Errors:**

- Axios interceptors catch API errors
- Toast notifications for user feedback
- Graceful fallbacks for failed requests

**Validation:**

- Form validation on checkout
- Required field checks
- Type validation

## Deployment Strategy

### Frontend Deployment (Vercel)

1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables:
   - `VITE_API_URL`: Production API URL
5. Deploy automatically on push to main branch

### Backend Deployment (Render)

1. Connect GitHub repository to Render
2. Set build command: `npm install && npm run build`
3. Set start command: `npm start`
4. Configure environment variables:
   - `PORT`: 5000
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `NODE_ENV`: production
5. Enable auto-deploy on push to main branch

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Configure network access (whitelist IPs)
3. Create database user
4. Get connection string
5. Update backend `.env` with connection string

## Testing Strategy

### Backend Testing (Jest + Supertest)

**Test Structure:**

```
backend/tests/
├── productRoutes.test.ts
├── orderRoutes.test.ts
└── models.test.ts
```

**Coverage:**

- API route handlers
- Database operations
- Error handling
- Validation logic

**Run Tests:**

```bash
cd backend
npm test
```

### Frontend Testing (Vitest)

**Test Structure:**

```
frontend/src/
├── __tests__/
│   ├── cartReducer.test.ts
│   └── components.test.tsx
```

**Coverage:**

- Cart reducer logic
- Component rendering
- User interactions
- Context providers

**Run Tests:**

```bash
cd frontend
npm test
```

### CI/CD Testing

GitHub Actions workflow runs:

1. Linting (ESLint)
2. Type checking (TypeScript)
3. Unit tests
4. Build verification

## Security Considerations

1. **Environment Variables**: Sensitive data stored in `.env` files
2. **CORS**: Configured for specific origins
3. **Input Validation**: All user inputs validated
4. **Error Messages**: Sanitized in production
5. **MongoDB**: Connection string secured
6. **API Rate Limiting**: Can be added for production

## Performance Optimizations

1. **Pagination**: Products loaded in batches
2. **Image Optimization**: Use CDN for product images
3. **Caching**: Consider Redis for frequently accessed data
4. **Database Indexing**: Index on category, price, name fields
5. **Code Splitting**: React lazy loading for routes
6. **Bundle Optimization**: Vite production builds optimized

## Future Enhancements

1. User authentication and authorization
2. Product reviews and ratings system
3. Payment gateway integration
4. Order tracking
5. Email notifications
6. Admin dashboard
7. Product recommendations
8. Wishlist functionality
9. Multi-currency support
10. Advanced analytics
