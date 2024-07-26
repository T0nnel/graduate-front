/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'
import'./navigate.css'
import { useState } from 'react';

export const Navigate = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
   navigate('/');
 };
  return (
    <div>
    <div className='header6'>
    <h2>ECOMY</h2>
      <nav>
        <div className="nav-link3">
          <ul>       
            <Link to={'/cart'}><img className='image' src="/images/img.png" alt="" /></Link>
            <li><Link to={'/product'}>Home</Link></li>
              <li><Link to={'/contact'}>Contact Us</Link></li>
              <li><Link to={'/dashboard'}>Dashboard</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </ul>
          <form onSubmit={handleSearchSubmit} className="search-form3">
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
    </div>
  </div>
  )
}
