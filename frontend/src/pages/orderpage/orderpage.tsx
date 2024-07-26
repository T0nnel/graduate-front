// Orderpage.tsx

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './orderpage.css';
import { Footer } from '../../components/footer/footer';
import { StripeCheckout } from '../../components/stripe/stripecheckout';

interface ShippingDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const Orderpage: React.FC = () => {
  const [shipping, setShipping] = useState<ShippingDetails>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Load cart items from localStorage
    const loadedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const purchaseInfo = JSON.parse(localStorage.getItem('purchase') || 'null');

    if (purchaseInfo) {
      // Add the purchaseInfo item to the cart
      setCartItems([purchaseInfo]);
    } else {
      setCartItems(loadedCart);
    }
  }, []);

  const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOrderSuccess(null);

    try {
      // Simulate a network request to submit order details
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds delay
      console.log('Order submitted:', { shipping, cartItems });
      setOrderSuccess(true);

      // Optionally, clear the cart and purchase information from localStorage
      localStorage.removeItem('cart');
      localStorage.removeItem('purchase');
    } catch (error) {
      console.error('Order submission failed:', error);
      setOrderSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="checkout-page">
        <div className="order-summary">
          <h3 className="section-title">Order Summary</h3>
          <ul className="order-items">
            {cartItems.map((item) => (
              <li key={item._id} className="order-item">
                {item.image && (
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                    className='order-item-image'
                  />
                )}
                <h1 className='header'>{item.name}</h1>
                <h4 className="order-total">Total: ${item.price.toFixed(2)}</h4>
              </li>
            ))}
          </ul>
        </div>

        <div className="checkout-container">
          <h2 className="checkout-title">Checkout</h2>
          {loading && <p className="loading-message">Ordering...</p>}
          {orderSuccess === true && <p className="success-message">Successfully ordered!</p>}
          {orderSuccess === false && <p className="error-message">Order failed. Please try again.</p>}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="section shipping-details">
              <h3 className="section-title">Shipping Details</h3>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Full Name"
                value={shipping.name}
                onChange={handleShippingChange}
                required
              />
              <input
                className="form-input"
                type="text"
                name="address"
                placeholder="Address"
                value={shipping.address}
                onChange={handleShippingChange}
                required
              />
              <input
                className="form-input"
                type="text"
                name="city"
                placeholder="City"
                value={shipping.city}
                onChange={handleShippingChange}
                required
              />
              <input
                className="form-input"
                type="text"
                name="state"
                placeholder="State"
                value={shipping.state}
                onChange={handleShippingChange}
                required
              />
              <input
                className="form-input"
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={shipping.zip}
                onChange={handleShippingChange}
                required
              />
            </div>

            <div className="section payment-information">
              <h3 className="section-title">Payment Information</h3>
              <StripeCheckout />
            </div>

            <button className="order-button" type="submit">Place Order</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
