// src/components/Checkout.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './orderpage.css';

interface ShippingDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface PaymentDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const mockCartItems: CartItem[] = [
  { id: '1', name: 'Product A', price: 29.99, quantity: 2 },
  { id: '2', name: 'Product B', price: 49.99, quantity: 1 },
];

export const Orderpage: React.FC = () => {
  const [shipping, setShipping] = useState<ShippingDetails>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [cartItems] = useState<CartItem[]>(mockCartItems);

  const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Submit order details to the backend
    console.log('Order submitted:', { shipping, payment, cartItems });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>Shipping Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shipping.name}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shipping.address}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shipping.city}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shipping.state}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={shipping.zip}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div className="section">
          <h3>Payment Information</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={payment.cardNumber}
            onChange={handlePaymentChange}
            required
          />
          <input
            type="text"
            name="expirationDate"
            placeholder="Expiration Date (MM/YY)"
            value={payment.expirationDate}
            onChange={handlePaymentChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={payment.cvv}
            onChange={handlePaymentChange}
            required
          />
        </div>

        <div className="section">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total: ${calculateTotal()}</h4>
        </div>

        <button className='order' type="submit">Place Order</button>
      </form>
    </div>
  );
};
