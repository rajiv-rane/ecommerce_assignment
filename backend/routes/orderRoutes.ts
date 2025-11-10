import express, { Request, Response } from 'express';
import Order, {
  IOrderItem,
  IShippingAddress,
  PaymentMethod,
} from '../models/Order.js';

const router = express.Router();

interface CreateOrderBody {
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: PaymentMethod;
}

// @route   POST /api/orders
// @desc    Create new order (mock checkout)
// @access  Public
router.post(
  '/',
  async (req: Request<{}, {}, CreateOrderBody>, res: Response) => {
    try {
      const { orderItems, shippingAddress, paymentMethod } = req.body;

      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
      }

      // Calculate prices
      const itemsPrice = orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      const taxPrice = itemsPrice * 0.1;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      // Create order
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid: true, // Mock payment
        paidAt: new Date(),
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ message: errorMessage });
    }
  }
);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'orderItems.product'
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: errorMessage });
  }
});

export default router;
