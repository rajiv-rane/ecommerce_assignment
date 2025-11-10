import { describe, it, expect } from 'vitest';
import { CartState, CartAction, CartItem } from '../types';

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.payload };

    case 'ADD_ITEM':
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      }

      return { ...state, items: [...state.items, action.payload] };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

describe('Cart Reducer', () => {
  const initialState: CartState = { items: [] };

  const sampleItem: CartItem = {
    _id: '1',
    name: 'Test Product',
    image: 'test.jpg',
    price: 99.99,
    quantity: 1,
  };

  it('should add item to empty cart', () => {
    const action: CartAction = { type: 'ADD_ITEM', payload: sampleItem };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(sampleItem);
  });

  it('should increment quantity when adding existing item', () => {
    const stateWithItem: CartState = { items: [sampleItem] };
    const action: CartAction = { type: 'ADD_ITEM', payload: sampleItem };
    const newState = cartReducer(stateWithItem, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const stateWithItem: CartState = { items: [sampleItem] };
    const action: CartAction = { type: 'REMOVE_ITEM', payload: '1' };
    const newState = cartReducer(stateWithItem, action);

    expect(newState.items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const stateWithItem: CartState = { items: [sampleItem] };
    const action: CartAction = {
      type: 'UPDATE_QUANTITY',
      payload: { id: '1', quantity: 5 },
    };
    const newState = cartReducer(stateWithItem, action);

    expect(newState.items[0].quantity).toBe(5);
  });

  it('should clear all items from cart', () => {
    const stateWithItems: CartState = {
      items: [sampleItem, { ...sampleItem, _id: '2' }],
    };
    const action: CartAction = { type: 'CLEAR_CART' };
    const newState = cartReducer(stateWithItems, action);

    expect(newState.items).toHaveLength(0);
  });

  it('should load cart from payload', () => {
    const items: CartItem[] = [sampleItem, { ...sampleItem, _id: '2' }];
    const action: CartAction = { type: 'LOAD_CART', payload: items };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toEqual(items);
    expect(newState.items).toHaveLength(2);
  });
});
