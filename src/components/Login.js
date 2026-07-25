import React, { useState } from 'react';
import './Login.css';
import { Lock, User } from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateUsername = (value) => {
    return /^[a-zA-Z0-9]{1,12}$/.test(value);
  };

  const validatePincode = (value) => {
    return /^\d{6}$/.test(value);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 12) {
      setUsername(value);
      setError('');
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setPincode(value);
      setError('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!validateUsername(username)) {
      setError('Username must be 1-12 letters and numbers only');
      return;
    }

    if (!pincode.trim()) {
      setError('PIN code is required');
      return;
    }

    if (!validatePincode(pincode)) {
      setError('PIN code must be exactly 6 digits');
      return;
    }

    setLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setLoading(false);
      // Store credentials in localStorage
      localStorage.setItem('walletUser', JSON.stringify({
        username,
        pincode,
        loginTime: new Date().toISOString()
      }));
      onLoginSuccess(username);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-circle">
            <Lock size={48} color="white" />
          </div>
          <h1>DigiBitWallet</h1>
          <p>Secure Login</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              <User size={18} />
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Max 12 letters & numbers"
              value={username}
              onChange={handleUsernameChange}
              maxLength="12"
              disabled={loading}
              className={error && username && !validateUsername(username) ? 'error' : ''}
            />
            <span className="char-count">{username.length}/12</span>
          </div>

          <div className="form-group">
            <label htmlFor="pincode">
              <Lock size={18} />
              PIN Code
            </label>
            <input
              id="pincode"
              type="password"
              placeholder="6 digits"
              value={pincode}
              onChange={handlePincodeChange}
              maxLength="6"
              disabled={loading}
              className={error && pincode && !validatePincode(pincode) ? 'error' : ''}
            />
            <span className="char-count">{pincode.length}/6</span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Wallet'}
          </button>
        </form>

        <div className="login-info">
          <p>🔒 Your wallet is secure with encrypted login</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
