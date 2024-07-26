import { Link } from 'react-router-dom';
import './navbar.css';

export const Navbar = () => {

  return (
    <div>
      <div className='header4'>
      <h2>ECOMY</h2>
        <nav>
          <div className="nav-link">
            <ul>       
              <Link to={'/cart'}><img className='image' src="/images/img.png" alt="" /></Link>
              <li><Link to={'/product'}>Products</Link></li>
              <li><Link to={'/login'}>Log In</Link></li>
              <li><Link to={'/register'}>Sign Up</Link></li>
              <li><Link to={'/contact'}>Contact Us</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
