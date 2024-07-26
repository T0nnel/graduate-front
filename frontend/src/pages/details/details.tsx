import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productpage.css'; 
import { Navigate } from '../../components/navigate/navigate';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navigate/>
      <div className="product-list-container">
        <h2>Product List</h2>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <div className="product-list">
            {products.map(product => (
              <Link 
                key={product._id} 
                to={`/details/${product._id}`} 
                className="product-item-link"
              >
                <div className="product-item">
                  {product.image && (
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                      className="product-image"
                    />
                  )}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Location: {product.location}</p>
                  <p>Shipping: {product.shippingType === 'free' ? 'Free' : `Priced ($${product.shippingPrice})`}</p>
                  <button className="favourite">Favourite</button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};
