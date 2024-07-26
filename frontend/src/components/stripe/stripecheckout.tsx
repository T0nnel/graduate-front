import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './stripe.css'; // Import the CSS file

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) as any,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Handle the payment method and send it to your server
    }
  };

  return (
    <div className="stripe-checkout-container">
      <form className="stripe-checkout-form" onSubmit={handleSubmit}>
        <CardElement className="stripe-card-element" />
        <button className="stripe-submit-button" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export const StripeCheckout: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);
