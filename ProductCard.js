import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const getTrustColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#2196F3';
    if (score >= 40) return '#FF9800';
    return '#F44336';
  };

  const getTrustLevel = (score) => {
    if (score >= 80) return 'Very High';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Medium';
    if (score >= 20) return 'Low';
    return 'Very Low';
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={`http://localhost:5000${product.image}`} alt={product.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>

        <div className="rating-info">
          <span className="rating">⭐ {product.averageRating.toFixed(1)}</span>
          <span className="reviews">({product.totalReviews} reviews)</span>
        </div>

        <div className="trust-score">
          <div className="trust-bar">
            <div
              className="trust-fill"
              style={{
                width: `${product.trustScore}%`,
                backgroundColor: getTrustColor(product.trustScore),
              }}
            ></div>
          </div>
          <span className="trust-text">
            Trust: {product.trustScore}% - {getTrustLevel(product.trustScore)}
          </span>
        </div>

        {product.fakeReviewsCount > 0 && (
          <div className="warning">
            ⚠️ {product.fakeReviewsCount} suspicious reviews detected
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
