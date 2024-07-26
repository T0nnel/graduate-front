/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import './navigation.css';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
}

export const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Sample list of products
  const products: Product[] = [
    { id: 1, name: 'Men\'s Slim Fit Suit Set' },
    { id: 2, name: 'Women\'s Summer Dress' },
    { id: 3, name: 'Leather Jacket' },
    // Add more products here
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Filter products based on search term
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setFilteredProducts(results);
    }
  };

  
  const handleLogout = () => {
     localStorage.removeItem('authToken'); 
    navigate('/');
  };
  return (
    <div>
      <div className='header5'>
      <h2>ECOMY</h2>
        <nav>
          <div className="nav-link1">
            <ul>       
              <Link to={'/cart'}><img className='image' src="/images/img.png" alt="" /></Link>
              <li><Link to={'/product'}>Home</Link></li>
              <li><Link to={'/contact'}>Contact Us</Link></li>
              <li><Link to={'/dashboard'}>Dashboard</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </ul>
            <form onSubmit={handleSearchSubmit} className="search-form1">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
          </div>
        </nav>
      {filteredProducts.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {filteredProducts.map(product => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
        </div>
        </div>
  );
};
