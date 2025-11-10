# MongoDB Atlas Connection String Guide

## Your Credentials

- **Username**: `rajivrane203_db_user`
- **Password**: `QyrzBDbnW26HFITD`

## How to Get Your Complete Connection String

1. **Log in to MongoDB Atlas**: https://cloud.mongodb.com/

2. **Go to your cluster**:

   - Click "Database" in the left sidebar
   - You'll see your cluster(s) listed

3. **Get the connection string**:

   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - Select "Node.js" and version (4.1 or later)
   - Copy the connection string

4. **The connection string format should be**:

   ```
   mongodb+srv://rajivrane203_db_user:QyrzBDbnW26HFITD@<YOUR-CLUSTER-NAME>.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

5. **Replace `<YOUR-CLUSTER-NAME>`** with your actual cluster name (e.g., `cluster0`, `cluster1`, `mycluster`, etc.)

## Common Cluster Names

- `cluster0` (most common for new clusters)
- `cluster1`
- `mycluster`
- Or a custom name you chose

## Update Your .env File

Once you have the correct connection string, update `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://rajivrane203_db_user:QyrzBDbnW26HFITD@<YOUR-CLUSTER-NAME>.mongodb.net/ecommerce?retryWrites=true&w=majority
NODE_ENV=development
```

## Important: IP Whitelist

Make sure your IP address is whitelisted in MongoDB Atlas:

1. Go to "Network Access" in MongoDB Atlas
2. Click "Add IP Address"
3. For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add your specific IP address

## Test Connection

After updating the `.env` file with the correct cluster name:

```bash
cd backend
npm run seed
```

You should see:

```
✅ MongoDB Connected: <your-cluster-name>.mongodb.net
Cleared existing products
Seeded 30 products
```
