import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Fake Review Detection System</h1>
        <p>Detect fake product reviews and trust e-commerce marketplace reviews</p>
        <Link to="/add-product" className="btn-primary">
          Add New Product
        </Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🔍 Fake Review Detection</h3>
          <p>AI-powered detection of fake and suspicious reviews using sentiment analysis and pattern recognition</p>
        </div>
        <div className="feature-card">
          <h3>⭐ Trust Scoring</h3>
          <p>Calculate comprehensive trust scores for products based on review authenticity and verified purchases</p>
        </div>
        <div className="feature-card">
          <h3>📸 Product Images</h3>
          <p>Upload and manage product images with easy integration</p>
        </div>
      </div>

      <ProductList />
    </div>
  );
};

export default Home;
