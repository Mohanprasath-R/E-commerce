import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const CartContext = createContext();

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id && item.quantity < item.stock
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case 'INCREMENT_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload && item.quantity < item.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREMENT_ITEM':
      return {
        ...state,
        items: state.items
          .map(item =>
            item._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Cart Provider with localStorage integration
export const CartProvider = ({ children }) => {
  // Load initial state from localStorage, with error handling
  const initialState = {
    items: (() => {
      try {
        return JSON.parse(localStorage.getItem('cartItems')) || [];
      } catch (error) {
        return [];
      }
    })(),
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
