import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ show, handleClose, handleLogin, handleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
        handleRegister({ name, email, password });
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    } else {
        handleLogin({ email, password });
    }
    };

  if (!show) {
    return null;
  }

  return (
    <div className="modalOverlay">
        <div className="modalContent">
            <button type="button" onClick={handleClose} className='closeLogin'>Close</button>
            <div className="loginText">
                <h2>{ isRegister ? 'Register' : 'Login' }</h2>
                <p>Welcome to E-commerce</p>      
            </div>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                )}
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
                <button
                    type="button"
                    className="switchButton"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default LoginModal;