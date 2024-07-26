import React, { useState, useEffect } from 'react';
import { Footer } from '../../components/footer/footer';
import './cart.css'; // Ensure you have this CSS file for styling
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  shippingType: 'free' | 'priced';
  shippingPrice?: number;
  image?: string;
}

export const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const loadedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(loadedCart);
  }, []);

  const handleRemove = (id: string) => {
    // Filter out the item with the given ID
    const updatedCart = cart.filter(product => product._id !== id);
    
    // Update state and localStorage
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleMove = () => {
    // Save the current cart to localStorage for the checkout page
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/order');
  };

  return (
    <>
      <div className='cart-container'>
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className='cart-items'>
            {cart.map(product => (
              <div className='cart-item' key={product._id}>
                {product.image && (
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className='cart-item-image'
                  />
                )}
                <div className='cart-item-details'>
                  <h3>{product.name}</h3>
                  <p className='hide'>{product.description}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p className='hide'>Location: {product.location}</p>
                  <p className='hide'>Shipping: {product.shippingType === 'free' ? 'Free' : `Priced ($${product.shippingPrice})`}</p>
                  <button className="purchase" onClick={handleMove}>Order</button>
                  <button className="remove" onClick={() => handleRemove(product._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
