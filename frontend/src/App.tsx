import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Homepage/HomePage';
import { ProductPage } from './pages/Productpage/ProductPage';
import { RegisterForm } from './components/register/registration';
import { LoginForm } from './components/login/login';
import { LoginPage } from './pages/Loginpage/LoginPage';
import { DashboardPage } from './pages/dashboard/dashboard';
import { UserProvider } from './pages/usercontext/usercontext'; // Corrected path
import { Orderpage } from './pages/orderpage/orderpage';
import { Productdetails } from './pages/productDetails/productdetails';
import { AddProduct } from './pages/addproduct/addproduct';
import { Cart } from './pages/cart/cart';

import { Contact } from './pages/contact/contact';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/order" element={<Orderpage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Productdetails />} /> {/* Corrected path */}
          <Route path="/:searchTerm" element={<ProductPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
