# E-Commerce Application

A modern, full-stack e-commerce application built with React (TypeScript) and Node.js/Express (TypeScript), featuring a complete shopping experience with product browsing, cart management, and checkout functionality.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

This e-commerce application provides a complete shopping experience with:

- **Product Browsing**: Search, filter, and sort products by category, price, and rating
- **Shopping Cart**: Add, update, and remove items with persistent storage
- **Checkout Flow**: Complete order placement with shipping information
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🛠 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management for cart
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client
- **Vitest** - Unit testing

### Backend

- **Node.js** with TypeScript
- **Express** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **Jest + Supertest** - API testing
- **Faker.js** - Data generation for seeding

## ✨ Features

### Product Management

- ✅ Browse products with pagination
- ✅ Search products by name, description, or brand
- ✅ Filter by category and price range
- ✅ Sort by price, rating, or newest
- ✅ View detailed product information

### Shopping Cart

- ✅ Add items to cart
- ✅ Update item quantities
- ✅ Remove items from cart
- ✅ Persistent cart storage (localStorage)
- ✅ Real-time cart total calculation
- ✅ Toast notifications for cart actions

### Checkout

- ✅ Shipping information form
- ✅ Multiple payment methods
- ✅ Order summary with tax and shipping
- ✅ Order confirmation page
- ✅ Mock order creation

### Additional Features

- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ TypeScript for type safety
- ✅ Comprehensive testing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB instance)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rajiv-rane/ecommerce_assignment.git
   cd ecommerce_assignment
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   Create `backend/.env`:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

   Create `frontend/.env` (optional):

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Seed the database**

   ```bash
   cd backend
   npm run seed
   ```

5. **Start development servers**

   ```bash
   # From root directory
   npm run dev
   ```

   Or start separately:

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📁 Project Structure

```
ecommerce_assignment/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   └── OrderSuccessPage.tsx
│   │   ├── context/         # React Context
│   │   │   └── CartContext.tsx
│   │   ├── services/       # API services
│   │   │   └── api.ts
│   │   ├── types/          # TypeScript types
│   │   │   └── index.ts
│   │   ├── __tests__/      # Test files
│   │   │   └── cartReducer.test.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Express backend API
│   ├── config/             # Configuration
│   │   └── db.ts
│   ├── models/              # Mongoose models
│   │   ├── Product.ts
│   │   └── Order.ts
│   ├── routes/              # API routes
│   │   ├── productRoutes.ts
│   │   └── orderRoutes.ts
│   ├── middleware/          # Express middleware
│   │   └── errorHandler.ts
│   ├── scripts/             # Utility scripts
│   │   └── seed.ts
│   ├── tests/               # Test files
│   │   └── productRoutes.test.ts
│   ├── server.ts
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
│
├── ARCHITECTURE.md          # Technical architecture document
├── openapi.yaml            # OpenAPI specification
├── README.md
└── package.json
```

## 🔌 API Endpoints

### Products

| Method | Endpoint                        | Description                                       |
| ------ | ------------------------------- | ------------------------------------------------- |
| GET    | `/api/products`                 | Get all products (with filters, sort, pagination) |
| GET    | `/api/products/:id`             | Get single product by ID                          |
| GET    | `/api/products/categories/list` | Get all categories                                |

### Orders

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | `/api/orders`     | Create new order |
| GET    | `/api/orders/:id` | Get order by ID  |

### Health

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| GET    | `/api/health` | Health check endpoint |

### Example Requests

**Get products with filters:**

```bash
GET /api/products?category=Electronics&minPrice=100&maxPrice=500&sortBy=price-low&page=1&limit=12
```

**Create order:**

```bash
POST /api/orders
Content-Type: application/json

{
  "orderItems": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "image": "image_url",
      "price": 99.99,
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

For complete API documentation, see [openapi.yaml](./openapi.yaml) or [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 📜 Scripts

### Root Level

- `npm run dev` - Start both frontend and backend in development mode
- `npm run install:all` - Install all dependencies

### Backend

- `npm run dev` - Start backend server with nodemon (TypeScript)
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample products (30 products using Faker)
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run Vitest tests

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

Tests are written using Jest and Supertest for API endpoint testing.

### Frontend Tests

```bash
cd frontend
npm test
```

Tests are written using Vitest for component and reducer testing.

### Test Coverage

- Backend: API routes, models, error handling
- Frontend: Cart reducer, context providers

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `frontend/dist`
4. Configure environment variable:
   - `VITE_API_URL`: Your production API URL
5. Deploy!

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Set build command: `npm install && npm run build`
3. Set start command: `npm start`
4. Configure environment variables:
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
5. Deploy!

### Database Setup (MongoDB Atlas)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP address (or 0.0.0.0/0 for all IPs)
4. Get your connection string
5. Update `MONGODB_URI` in backend `.env`

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture and system design
- [openapi.yaml](./openapi.yaml) - OpenAPI 3.0 specification
- [docs/PROMPTS_USED.md](./docs/PROMPTS_USED.md) - Development prompts and notes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Rajiv Rane**

- GitHub: [@rajiv-rane](https://github.com/rajiv-rane)

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---

⭐ If you found this project helpful, please give it a star!
