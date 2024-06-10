import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ handleCart, cartCount }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className='navbarContainer'>
      <Link to='/' className='logo' onClick={hideMenu}><span>E</span>commerce</Link>

      <div className={`menuToggle ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
        <div className='hamburger'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>

      <nav className={`navbar ${showMenu ? 'active' : ''}`}>
        <Link to='/' className='navLink' onClick={hideMenu}>Home</Link>
        <Link to='/products' className='navLink' onClick={hideMenu}>Products</Link>
        <Link to='/contact' className='navLink' onClick={hideMenu}>Contact</Link>
      </nav>

      <div className="cartIcon" onClick={handleCart}>
        <div className='icon'>
          <i className="fa-solid fa-shopping-cart"></i>
        </div>
        <span className="cartCount">{cartCount}</span>
      </div>
    </div>
  );
};

export default Navbar;