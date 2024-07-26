// Productdetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types/types'; // Adjust the path if needed
import { Navigate } from '../../components/navigate/navigate';
import "./productdetails.css";
import { Footer } from '../../components/footer/footer';

export const Productdetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the route parameters
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Function to fetch product details from the server
    const fetchProductData = async () => {
      if (!id) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch product data: ${errorText}`);
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      navigate('/cart'); // Redirect to cart page
    }
  };

  const handlePurchase = () => {
    if (product) {
      const purchaseInfo = {
        ...product,
        quantity: 1, // Assuming default quantity is 1
      };
      localStorage.setItem('purchase', JSON.stringify(purchaseInfo));
      navigate('/order'); // Redirect to order page
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
      <Navigate/>
      <div className='details101'>
        <h1>Product Details</h1>
        {product ? (
          <>
            <div className='details103'>
              <h2>{product.name}</h2>
              <p className='one'><strong>Description:</strong> {product.description}</p>
              <p className='two'><strong>Price:</strong> ${product.price.toFixed(2)}</p>
              <p className='three'><strong>Location:</strong> {product.location}</p>
              <p className='four'><strong>Shipping Type:</strong> {product.shippingType}</p>
              {product.shippingPrice && <p><strong>Shipping Price:</strong> ${product.shippingPrice.toFixed(2)}</p>}
            </div>
            <div className='details102'>
              {product.image && <img className='image101' src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} />}
            </div>
            <button className='addtocart' onClick={handleAddToCart}>Add to Cart</button>
            <button className='purchase' onClick={handlePurchase}>Purchase</button>
          </>
        ) : (
          <h2>Product not found.</h2>
        )}
      </div>
      <Footer/>
    </>
  );
};
