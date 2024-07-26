import React, { useEffect, useState } from 'react';
import './cart.css';

export const Cart: React.FC = () => {
  const [product, setProduct] = useState<{ name: string; price: string; image?: string } | null>(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem('cartProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  return (
    <div className="cart-container">
      <h1>Cart Page</h1>
      {product ? (
        <div className="product-details">
          {product.image && (
            <img className="product-image" src={product.image} alt={product.name} />
          )}
          <h2>Product Details</h2>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
        </div>
      ) : (
        <p className="no-product">No product in the cart</p>
      )}
    </div>
  );
};
