import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Products from './pages/product/Products';
import CartModal from './components/cartModal/CartModal';
import Checkout from './pages/checkout/Checkout';
import ProductDetails from './pages/productDetails/ProductDetails';
import LoginModal from './components/loginModal/LoginModal';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartModal, setCartModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCart = () => {
    setCartModal(!cartModal);
  };

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleLogin = (credentials) => {
    setIsAuthenticated(true);
    setLoginModal(false);
  };

  const handleRegister = (userData) => {
    console.log('Registering user:', userData);
  };

  return (
    <>
      <Navbar handleCart={handleCart} cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} cartItems={cartItems} setCartItems={setCartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} isAuthenticated={isAuthenticated} showLoginModal={() => setLoginModal(true)} />} />
        <Route path="/products/:productId" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
      </Routes>
      {cartModal && <CartModal cartItems={cartItems} setCartItems={setCartItems} />}
      <LoginModal show={loginModal} handleClose={() => setLoginModal(false)} handleLogin={handleLogin} handleRegister={handleRegister} />
    </>
  );
}

export default App;