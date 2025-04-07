import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from './services/authService';
import './LandingPage.css';
import Footer from "./Footer";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const result = await login({ email: formData.email, password: formData.password });
        localStorage.setItem('token', result.token);
        navigate('/hospitals');
      } else {
        await signup(formData);
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (error) {
      setMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleFundraiserClick = (e) => {
    e.preventDefault(); 
    navigate("/Fundraiser"); 
  };

  const handleGalleryClick = (e) => {
    e.preventDefault(); 
    navigate("/Gallery"); 
  };

  const handleDashboardClick = (e) => {
    e.preventDefault(); 
    navigate("/Dashboard"); 
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <h2 className="logo">Canvas of Care</h2>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#Gallery" onClick={handleGalleryClick}>Gallery</a></li>
          <li><a href="#Fundraiser" onClick={handleFundraiserClick}>Fundraiser</a></li>
          <li><a href="#Dashboard" onClick={handleDashboardClick}>Dashboard</a></li>
        </ul>
      </nav>

      <div className="landing-container">
        <div className="welcome-section">
          <h1><span className="welcome-text">Welcome to</span> <span>Canvas of Care!</span></h1>
          <p>A safe and fun place where young artists aged 5-15 can create, share, and explore amazing artwork!</p>
          <div className="gallery-preview">
            <div className="artwork-frame">
              <img src="https://drawingcstorage.blob.core.windows.net/artwork-gallery/1743352020782-Screenshot 2025-03-30 215609.jpg" alt="Artwork 1" />
            </div>
            <div className="artwork-frame">
              <img src="https://drawingcstorage.blob.core.windows.net/artwork-gallery/1743352202718-Screenshot 2025-03-30 215920.jpg" alt="Artwork 2" />
            </div>
          </div>
        </div>
        
        <div className="auth-box">
          <div className="auth-toggle">
            <button 
              className={isLogin ? "active" : ""} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={!isLogin ? "active" : ""} 
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {message && <p className="message">{message}</p>}
            {!isLogin && (
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">👤</span>
              </div>
            )}
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-icon">✉️</span>
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="input-icon">🔒</span>
            </div>
            <button type="submit" className="submit-btn">
              {isLogin ? "Login" : "Sign Up"}
              <span className="arrow">→</span>
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;