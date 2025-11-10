import mongoose, { Document, Schema } from 'mongoose';

export type ProductCategory =
  | 'Electronics'
  | 'Clothing'
  | 'Books'
  | 'Home'
  | 'Sports'
  | 'Toys';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  brand?: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'],
    },
    brand: {
      type: String,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
