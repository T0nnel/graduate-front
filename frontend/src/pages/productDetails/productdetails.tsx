import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from '../../components/navigate/navigate';
import './productdetails.css'; // Ensure you have this CSS file for styling

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

export const Productdetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product with ID: ${id}`); // Debugging statement
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log('Product data:', response.data); // Debugging statement
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navigate />
      <div className="product-details-container">
        <h2>{product.name}</h2>
        <div className="product-details">
          {product.image && (
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              className="product-detail-image"
            />
          )}
          <div className="product-info">
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Location: {product.location}</p>
            <p>Shipping: {product.shippingType === 'free' ? 'Free' : `Priced ($${product.shippingPrice})`}</p>
            <button className="favourite">Add to Favourite</button>
          </div>
        </div>
      </div>
    </>
  );
};
