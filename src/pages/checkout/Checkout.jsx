import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cartItems, clearCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setAdditionalInfo('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let productsInfo = '';

    cartItems.forEach((item) => {
      productsInfo += `${item.title} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    Swal.fire({
      title: 'Order Placed!',
      text: `Thank you for your order.`,
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button',
      },
    }).then(() => {
      clearCart();
      navigate('/products');
    });
  };

  return (
    <div className="checkoutContainer">
      <div className="checkoutDetails">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Address:
            <input type="text" name="address" required />
          </label>
          <label>
            Payment Method:
            <select name="payment" required onChange={handlePaymentChange}>
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </label>
          {paymentMethod === 'credit' && (
            <label>
              Credit Card Number:
              <input type="text" name="cardNumber" required />
            </label>
          )}
          {paymentMethod === 'paypal' && (
            <label>
              PayPal Email:
              <input type="email" name="paypalEmail" required />
            </label>
          )}
          <button type="submit">Place Order</button>
        </form>
      </div>
      <div className="receipt">
        <h2>Receipt</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="receiptItem">
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
        <div className="total">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;