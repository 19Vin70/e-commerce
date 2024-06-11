import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import useAddToCart from '../../components/useAddToCart/useAddToCart';
import './Products.css';

const Products = ({ addToCart, isAuthenticated, showLoginModal }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const handleAddToCart = useAddToCart(addToCart);

  const fetchProducts = async () => {
    try {
      const response = await Axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCartClick = (product) => {
    if (isAuthenticated) {
      handleAddToCart(product);
    } else {
      showLoginModal();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const convertToPHP = (usdPrice) => {
    const conversionRate = 56; 
    return usdPrice * conversionRate;
  };

  const filteredProducts = products.filter(product =>
    product.category.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className='container'>
      <input
        type="text"
        className='searchBar'
        placeholder="Search by category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className='productContainer'>
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className='productCard'>
            <img src={product.image} alt={product.title} />
            <div className="productDetails">
              <h2>{product.title.slice(0, 20)}{product.title.length > 20 ? "..." : ""}</h2>
              <p>₱{convertToPHP(product.price).toFixed(2)}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCartClick(product);
                }}
                style={{ zIndex: 9999, padding: '8px 10px' }}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;