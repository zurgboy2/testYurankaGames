// src/components/CartIcon.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartIcon.css';

const CartIcon = () => {
  const { state } = useCart();
  
  return (
    <div className="cart-icon-container">
      <Link to="/cart" className="cart-icon-link">
        <div className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
          {state.totalQuantity > 0 && (
            <span className="cart-badge">{state.totalQuantity}</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;