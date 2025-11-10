# Backend Setup Guide

## MongoDB Connection Setup

The application requires a MongoDB database connection. You have two options:

### Option 1: MongoDB Atlas (Recommended - Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)
4. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Save the username and password
5. Whitelist your IP address:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
6. Get your connection string:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### Option 2: Local MongoDB

1. Install MongoDB locally:
   ```bash
   # macOS (using Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   
   # Or download from: https://www.mongodb.com/try/download/community
   ```

2. MongoDB will run on `mongodb://localhost:27017`

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
```

### Example MongoDB Atlas Connection String:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### Example Local MongoDB Connection String:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

## Running the Seed Script

After setting up your `.env` file:

```bash
cd backend
npm run seed
```

This will:
- Connect to your MongoDB database
- Clear existing products
- Generate 30 sample products using Faker.js
- Display success message

## Troubleshooting

### Error: "MongoDB connection string not found"
- Make sure you created a `.env` file in the `backend` directory
- Check that `MONGODB_URI` is set in the `.env` file

### Error: "ECONNREFUSED" or "Authentication failed"
- Verify your MongoDB connection string is correct
- For MongoDB Atlas: Check IP whitelist includes your IP
- For MongoDB Atlas: Verify username and password are correct
- For local MongoDB: Ensure MongoDB service is running

### Error: "Server selection timed out"
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Check firewall settings

