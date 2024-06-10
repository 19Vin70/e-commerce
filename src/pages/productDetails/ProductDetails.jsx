import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useAddToCart from '../../components/useAddToCart/useAddToCart';
import './ProductDetails.css';

const ProductDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const handleAddToCart = useAddToCart(addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return null;

  return (
    <div className="productDetailsPage">
      <button className="goBackButton" onClick={() => navigate(-1)}>Go Back</button>
      <img className="productImage" src={product.image} alt={product.title} />
      <div className="productDesc">
        <p className="category">Category: {product.category}</p>
        <h2 className="title">{product.title}</h2>
        <p className="description">{product.description}</p>
        <p className="price">${product.price}</p>
        <button className="addToCartButton" onClick={() => handleAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;