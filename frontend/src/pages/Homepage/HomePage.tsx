import React from 'react'
import './homepage.css';
import { Navbar } from '../../components/navbar/navbar';

export const HomePage: React.FC = () => {

  return (
    <div>
      <div className='home'>
        <Navbar />
        <h1>Leading Ecommerce website Worldwide</h1>
      </div>
      <div className='header3'>
      </div>
    </div>
  );
};
