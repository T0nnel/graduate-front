import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addproduct.css';
import { Footer } from '../../components/footer/footer';

export const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    shippingType: 'free',
    shippingPrice: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('location', product.location);
    formData.append('shippingType', product.shippingType);
    if (product.shippingType === 'priced') {
      formData.append('shippingPrice', product.shippingPrice);
    }
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Ensure response is JSON and handle it
      const data = response.data;
      if (data && data.image) {
        const imageUrl = `http://localhost:5000/uploads/${data.image}`; // Adjust based on your server setup

        // Store product details in localStorage
        localStorage.setItem('cartProduct', JSON.stringify({
          ...product,
          image: imageUrl // Add the image URL to the product data
        }));

        navigate('/product'); // Navigate to a page where the product is displayed
      } else {
        throw new Error('Image URL not found in response');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Image Upload:
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={product.location}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Shipping Type:
            <select
              name="shippingType"
              value={product.shippingType}
              onChange={handleChange}
              required
            >
              <option value="free">Free Shipping</option>
              <option value="priced">Priced Shipping</option>
            </select>
          </label>
        </div>
        {product.shippingType === 'priced' && (
          <div>
            <label>
              Shipping Price:
              <input
                type="number"
                name="shippingPrice"
                value={product.shippingPrice}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        )}
        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>
      <Footer/>
    </div>
  );
};
