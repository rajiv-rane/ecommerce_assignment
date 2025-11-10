import request from 'supertest';
import express from 'express';
import productRoutes from '../routes/productRoutes.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

describe('Product Routes', () => {
  beforeAll(async () => {
    const mongoUri =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await Product.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
    await Product.insertMany([
      {
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        image: 'test.jpg',
        category: 'Electronics',
      },
    ]);
  });

  test('GET /api/products - should return products', async () => {
    const res = await request(app).get('/api/products').expect(200);

    expect(res.body).toHaveProperty('products');
    expect(res.body.products).toBeInstanceOf(Array);
  });

  test('GET /api/products/:id - should return single product', async () => {
    const product = await Product.findOne();
    if (product) {
      const res = await request(app)
        .get(`/api/products/${product._id}`)
        .expect(200);

      expect(res.body).toHaveProperty('name', 'Test Product');
    }
  });
});
