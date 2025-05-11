// src/services/cartService.js

// Add item to Shopify cart
export const addToCart = async (variantId, quantity) => {
  // First, check if a cart already exists in localStorage
  let cartId = localStorage.getItem('cartId');
  let cart;
  
  if (!cartId) {
    // Create a new cart
    cart = await createCart(variantId, quantity);
    localStorage.setItem('cartId', cart.id);
  } else {
    // Add to existing cart
    cart = await addLineItemToCart(cartId, variantId, quantity);
  }
  
  return cart;
};

// Create a new cart with Shopify Storefront API
const createCart = async (variantId, quantity) => {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;
  
  const variables = {
    input: {
      lines: [
        {
          quantity: quantity,
          merchandiseId: variantId
        }
      ]
    }
  };
  
  const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
    },
    body: JSON.stringify({ query, variables }),
  });
  
  const result = await response.json();
  return result.data.cartCreate.cart;
};

// Add items to an existing cart
const addLineItemToCart = async (cartId, variantId, quantity) => {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;
  
  const variables = {
    cartId: cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity: quantity
      }
    ]
  };
  
  const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
    },
    body: JSON.stringify({ query, variables }),
  });
  
  const result = await response.json();
  return result.data.cartLinesAdd.cart;
};

// Get cart contents
export const getCart = async (cartId) => {
  if (!cartId) return null;
  
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;
  
  const variables = {
    cartId: cartId
  };
  
  const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
    },
    body: JSON.stringify({ query, variables }),
  });
  
  const result = await response.json();
  return result.data.cart;
};

// Update cart item quantity
export const updateCartItemQuantity = async (cartId, lineId, quantity) => {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;
  
  const variables = {
    cartId: cartId,
    lines: [
      {
        id: lineId,
        quantity: quantity
      }
    ]
  };
  
  const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
    },
    body: JSON.stringify({ query, variables }),
  });
  
  const result = await response.json();
  return result.data.cartLinesUpdate.cart;
};

// Remove item from cart
export const removeCartItem = async (cartId, lineId) => {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;
  
  const variables = {
    cartId: cartId,
    lineIds: [lineId]
  };
  
  const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
    },
    body: JSON.stringify({ query, variables }),
  });
  
  const result = await response.json();
  return result.data.cartLinesRemove.cart;
};

// Get checkout URL from cart
export const getCheckoutUrl = async (cartId) => {
  const query = `
    query getCheckoutUrl($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  
  const variables = {
    cartId: cartId
  };
  
  const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
    },
    body: JSON.stringify({ query, variables }),
  });
  
  const result = await response.json();
  return result.data.cart.checkoutUrl;
};