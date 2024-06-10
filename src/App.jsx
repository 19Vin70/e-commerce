import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Products from './pages/product/Products';
import CartModal from './components/cartModal/CartModal';
import Checkout from './pages/checkout/Checkout';
import ProductDetails from './pages/productDetails/ProductDetails';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [ cartModal, setCartModal ] = useState( false );

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

  return (
    <>
      <Navbar handleCart={handleCart} cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} cartItems={cartItems} setCartItems={setCartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/products/:productId" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
      </Routes>
      {cartModal && <CartModal cartItems={cartItems} setCartItems={setCartItems} />}
    </>
  );
}

export default App;