import express, { Request, Response } from 'express';
import Product from '../models/Product.js';

const router = express.Router();

interface ProductQuery {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

// @route   GET /api/products
// @desc    Get all products with search, filter, and sort
// @access  Public
router.get(
  '/',
  async (req: Request<{}, {}, {}, ProductQuery>, res: Response) => {
    try {
      const {
        search,
        category,
        minPrice,
        maxPrice,
        sortBy,
        page = '1',
        limit = '12',
      } = req.query;

      // Build query
      const query: any = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
        ];
      }

      if (category) {
        query.category = category;
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      // Build sort
      let sort: any = {};
      switch (sortBy) {
        case 'price-low':
          sort = { price: 1 };
          break;
        case 'price-high':
          sort = { price: -1 };
          break;
        case 'rating':
          sort = { rating: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }

      const skip = (Number(page) - 1) * Number(limit);

      const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

      const total = await Product.countDocuments(query);

      res.json({
        products,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ message: errorMessage });
    }
  }
);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: errorMessage });
  }
});

// @route   GET /api/products/categories/list
// @desc    Get all categories
// @access  Public
router.get('/categories/list', async (req: Request, res: Response) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: errorMessage });
  }
});

export default router;
