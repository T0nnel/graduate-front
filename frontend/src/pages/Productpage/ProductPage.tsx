// src/components/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './productpage.css'; // Ensure this path is correct
import { Footer } from '../../components/footer/footer';
import { Navigate } from '../../components/navigate/navigate';
import { useUser } from '../usercontext/usercontext';

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

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { user } = useUser(); // Access user data from UserContext

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before starting fetch
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once

  const handleViewClick = (id: string) => {
    navigate(`/product/${id}`); // Navigate to the product details page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navigate />
      <div className="product-list-container">
        {user ? (
          <div className="user-info">
            <h2>Welcome Back, {user.name}!</h2>
          </div>
        ) : (
          <p>Please log in to see your information.</p>
        )}
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <div className="product-list">
            {products.map(product => (
              <div className="product-item" key={product._id}>
                {product.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
                <h3>{product.name}</h3>
                <p className='hide'>{product.description}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Location: {product.location}</p>
                <p>Shipping: {product.shippingType === 'free' ? 'Free' : `Priced ($${product.shippingPrice?.toFixed(2)})`}</p>
                <div className="buts">
                  <button className="view" onClick={() => handleViewClick(product._id)}>View</button>
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
