import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import useAddToCart from '../../components/useAddToCart/useAddToCart';
import './Products.css';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const handleAddToCart = useAddToCart( addToCart );

  const fetchProducts = async () => {
    try {
      const response = await Axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='productContainer'>
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`} className='productCard'>
          <img src={product.image} alt={product.title} />
          <div className="productDetails">
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} style={{zIndex: 9999, padding: '8px 10px'}}>
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;