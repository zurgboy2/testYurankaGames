import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ProductDetail.css';
import { useCart } from '../context/CartContext';
import { addToCart } from '../services/cartService';


const ProductDetail = () => {
  // Get product ID from the navigation state
  const location = useLocation();
  const productId = location.state?.productId;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);
  

  console.log('ProductDetail initialized with productId from state:', productId);
  
  useEffect(() => {
    if (!productId) {
        // No product ID in navigation state, check if we have an ID in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const idFromUrl = urlParams.get('id');
        
        if (idFromUrl) {
        fetchProductDetails(idFromUrl);
        } else {
        setError('No product selected. Please return to the store and select a product.');
        setLoading(false);
        }
        return;
    }
    
    fetchProductDetails(productId);
  }, [productId]);


  const fetchProductDetails = async (id) => {
    console.log('Fetching product details for ID:', id);
    setLoading(true);
    
    try {
      const query = `
        query productByID {
          product(id: "${id}") {
            title
            variants(first: 10) {
              nodes {
                image {
                  url
                }
                price {
                  amount
                  currencyCode
                }
                weight
                requiresShipping
                quantityAvailable
                availableForSale
                id
              }
            }
            descriptionHtml
            requiresSellingPlan
          }
        }
      `;

      const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log('API response received:', data);
      
      if (data.data && data.data.product) {
        const productData = data.data.product;
        setProduct(productData);
        
        // Set default variant (first one)
        if (productData.variants.nodes.length > 0) {
          setVariant(productData.variants.nodes[0]);
        }
      } else {
        console.error('No product found in API response:', data);
        setError('Product not found or unavailable');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Failed to load product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Format price for display
  const formatPrice = (price, currency = 'USD') => {
    if (!price) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(parseFloat(price));
  };

  // Handle quantity changes
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    console.log('Quantity change attempted:', newQuantity);
    if (newQuantity > 0 && (!variant || newQuantity <= variant.quantityAvailable)) {
      console.log('Setting new quantity:', newQuantity);
      setQuantity(newQuantity);
    } else {
      console.log('Invalid quantity value, not updating state');
    }
  };

  const handleAddToCart = async () => {
    if (!variant || !variant.availableForSale) {
      alert('This product is currently unavailable');
      return;
    }
    
    setAddingToCart(true);
    
    try {
      // Call Shopify API to add item to cart
      await addToCart(variant.id, quantity);
      
      // Update local cart state
      dispatch({ 
        type: 'ADD_ITEM', 
        payload: {
          id: variant.id,
          title: product.title,
          price: parseFloat(variant.price.amount),
          quantity: quantity,
          image: variant.image?.url || '/images/placeholder.jpg',
          variantTitle: variant.title
        } 
      });
      
      alert(`Added ${quantity} x ${product.title} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  console.log('Rendering ProductDetail component with state:', { 
    loading, 
    error, 
    hasProduct: !!product, 
    hasVariant: !!variant 
  });

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <Link to="/store" className="return-link">Return to Store</Link>
        </div>
      </div>
    );
  }

  if (!product || !variant) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          <h3>Product Not Found</h3>
          <Link to="/store" className="return-link">Return to Store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <Link to="/store" className="back-link">← Back to Store</Link>
        <h2>{product.title}</h2>
      </div>
      
      <div className="product-detail-content">
        <div className="product-image-container">
          <img 
            src={variant.image?.url || '/images/placeholder.jpg'} 
            alt={product.title} 
            className="product-detail-image" 
            onLoad={() => console.log('Product image loaded')}
            onError={() => console.log('Product image failed to load')}
          />
        </div>
        
        <div className="product-info-container">
          <div className="product-price">
            {formatPrice(variant.price.amount, variant.price.currencyCode)}
          </div>
          
          <div className="product-availability">
            {variant.availableForSale ? (
              <p className="in-stock">
                In Stock: {variant.quantityAvailable} available
              </p>
            ) : (
              <p className="out-of-stock">Out of Stock</p>
            )}
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                max={variant.quantityAvailable} 
                value={quantity} 
                onChange={handleQuantityChange}
                disabled={!variant.availableForSale}
              />
            </div>
            
            <button 
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={!variant.availableForSale || variant.quantityAvailable < 1 || addingToCart}
            >
                {addingToCart ? 'Adding...' : variant.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </div>
          
          <div className="product-details">
            <h3>Product Details</h3>
            <ul>
              {variant.weight ? <li>Weight: {variant.weight} g</li> : null}
              <li>Shipping Required: {variant.requiresShipping ? 'Yes' : 'No'}</li>
              {product.requiresSellingPlan ? <li>Subscription Product</li> : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;