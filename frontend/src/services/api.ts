import axios from 'axios';
import { Product, ProductsResponse, Order } from '../types';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ProductParams {
  search?: string;
  category?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  sortBy?: string;
  page?: string | number;
  limit?: string | number;
}

interface CreateOrderData {
  orderItems: Array<{
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'Credit Card' | 'PayPal' | 'Cash on Delivery';
}

export const productService = {
  getProducts: async (
    params: ProductParams = {}
  ): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>('/products', { params });
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/products/categories/list');
    return response.data;
  },
};

export const orderService = {
  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    const response = await api.post<Order>('/orders', orderData);
    return response.data;
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },
};

export default api;
