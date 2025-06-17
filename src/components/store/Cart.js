// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getCart, updateCartItemQuantity, removeCartItem, getCheckoutUrl } from '../../services/cartService';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const cartId = localStorage.getItem('cartId');
        
        if (!cartId) {
          setCartData({ lines: { edges: [] } });
          setLoading(false);
          return;
        }
        
        const cart = await getCart(cartId);
        setCartData(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError('Failed to load cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCart();
  }, []);
  
  const handleUpdateQuantity = async (lineId, productId, newQuantity) => {
    try {
      const cartId = localStorage.getItem('cartId');
      await updateCartItemQuantity(cartId, lineId, newQuantity);
      
      // Update local state
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { id: productId, quantity: newQuantity } 
      });
      
      // Refresh cart data
      const updatedCart = await getCart(cartId);
      setCartData(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update item quantity. Please try again.');
    }
  };
  
  const handleRemoveItem = async (lineId, productId) => {
    try {
      const cartId = localStorage.getItem('cartId');
      await removeCartItem(cartId, lineId);
      
      // Update local state
      dispatch({ type: 'REMOVE_ITEM', payload: { id: productId } });
      
      // Refresh cart data
      const updatedCart = await getCart(cartId);
      setCartData(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };
  
  const handleCheckout = async () => {
    try {
      const cartId = localStorage.getItem('cartId');
      if (!cartId) return;
      
      const checkoutUrl = await getCheckoutUrl(cartId);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };
  
  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(parseFloat(price));
  };
  
  if (loading) {
    return (
      <div className="cart-page">
        {/* <Navbar /> */}
        <div className="cart-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading cart...</p>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="cart-page">
        {/* <Navbar /> */}
        <div className="cart-container">
          <div className="error-message">
            <h3>Error</h3>
            <p>{error}</p>
            <button
             className="continue-shopping"
             onClick={() => navigate('/store')}
            >
            Continue Shopping
            </button>          
                </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
  
  const cartItems = cartData?.lines?.edges || [];
  const cartTotal = cartData?.estimatedCost?.totalAmount?.amount || '0.00';
  const cartCurrency = cartData?.estimatedCost?.totalAmount?.currencyCode || 'USD';
  
  return (
    <div className="cart-page">
      {/* <Navbar /> */}
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button
             className="continue-shopping"
             onClick={() => navigate('/store')}
            >
            Continue Shopping
            </button>             </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(({ node }) => (
                <div key={node.id} className="cart-item">
                  <div className="cart-item-image">
                    <img 
                      src={node.merchandise.image?.url || '/images/placeholder.jpg'} 
                      alt={node.merchandise.product.title} 
                    />
                  </div>
                  <div className="cart-item-details">
                    <h3>{node.merchandise.product.title}</h3>
                    {node.merchandise.title !== 'Default Title' && (
                      <p className="variant-title">{node.merchandise.title}</p>
                    )}
                    <p className="item-price">
                      {formatPrice(node.merchandise.price.amount, node.merchandise.price.currencyCode)}
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button 
                        onClick={() => handleUpdateQuantity(node.id, node.merchandise.id, node.quantity - 1)}
                        disabled={node.quantity <= 1}
                      >-</button>
                      <span>{node.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(node.id, node.merchandise.id, node.quantity + 1)}
                      >+</button>
                    </div>
                    <button 
                      className="remove-item"
                      onClick={() => handleRemoveItem(node.id, node.merchandise.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    {formatPrice(node.merchandise.price.amount * node.quantity, node.merchandise.price.currencyCode)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>{formatPrice(cartTotal, cartCurrency)}</span>
              </div>
              <div className="cart-actions">
              <button
              className="continue-shopping"
              onClick={() => navigate('/store')}
              >
            Continue Shopping
            </button>                   <button className="checkout-button" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;