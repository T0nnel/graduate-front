import React from 'react'
import './homepage.css';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
const navigate = useNavigate()

  function handleLogin() {
    navigate('/login')
  }

  return (
    <>
    <div>
      <div className='home'>
        <Navbar />
        <h1>Leading Ecommerce website Worldwide</h1>
        <h2>To get amazign products that we have on offer today kindly login so as to receive the best user experience</h2>
         <button className='login' onClick={handleLogin}>Login</button>
      </div>
      <div className='header3'>
      </div>
    </div>
    <Footer/>
    </>
  );
};
