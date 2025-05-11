// src/context/CartContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + action.payload.quantity,
          totalPrice: state.totalPrice + (action.payload.price * action.payload.quantity)
        };
      } else {
        // Add new item to cart
        return {
          ...state,
          items: [...state.items, action.payload],
          totalQuantity: state.totalQuantity + action.payload.quantity,
          totalPrice: state.totalPrice + (action.payload.price * action.payload.quantity)
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (!existingItem) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        totalQuantity: state.totalQuantity - existingItem.quantity,
        totalPrice: state.totalPrice - (existingItem.price * existingItem.quantity)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex === -1) return state;
      
      const item = state.items[existingItemIndex];
      const quantityDiff = action.payload.quantity - item.quantity;
      
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...item,
        quantity: action.payload.quantity
      };
      
      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity + quantityDiff,
        totalPrice: state.totalPrice + (quantityDiff * item.price)
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    case 'SYNC_CART':
      return {
        ...state,
        items: action.payload.items,
        totalQuantity: action.payload.totalQuantity,
        totalPrice: action.payload.totalPrice
      };
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      const cartId = localStorage.getItem('cartId');
      
      if (cartId) {
        try {
          // We'll implement this function in Step 2
          const cartService = await import('../services/cartService');
          const cart = await cartService.getCart(cartId);
          
          if (cart && cart.lines.edges.length > 0) {
            const items = cart.lines.edges.map(edge => ({
              id: edge.node.merchandise.id,
              lineId: edge.node.id,
              title: edge.node.merchandise.product.title,
              variantTitle: edge.node.merchandise.title,
              price: parseFloat(edge.node.merchandise.price.amount),
              quantity: edge.node.quantity,
              image: edge.node.merchandise.image?.url || '/images/placeholder.jpg'
            }));
            
            dispatch({ 
              type: 'SYNC_CART', 
              payload: { 
                items,
                totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
                totalPrice: parseFloat(cart.estimatedCost.totalAmount.amount)
              }
            });
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    };
    
    loadCart();
  }, []);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);