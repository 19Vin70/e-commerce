import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartModal.css';

const CartModal = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true); 

  const incrementQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };

  const decrementQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
    } else {
      newCartItems.splice(index, 1);
    }
    setCartItems(newCartItems);
  };

  const total = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  const handleCheckout = () => {
    setIsVisible(false); 
    navigate('/checkout');
  };

  return (
    <>
      {isVisible && ( 
        <div className='cartContainer'>
          <div className='cartModal'>
            <div className='cartItems'>
              <h2>Cart</h2>
              {cartItems.map((item, index) => (
                <div key={index} className='cartItem'>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
                    <div className='quantityContainer'>
                      <span className='quantity'>Quantity:
                        <button onClick={() => decrementQuantity(index)}>-</button> {item.quantity}
                        <button onClick={() => incrementQuantity(index)}>+</button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='total'>
              <h3>Total: ${total.toFixed(2)}</h3>
              <button className='checkout' onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;