import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI, reviewAPI, analysisAPI } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import ReviewItem from '../components/ReviewItem';
import ReviewAnalyzer from '../components/ReviewAnalyzer';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [trustScore, setTrustScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reviews');

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const [productRes, reviewsRes, trustRes] = await Promise.all([
        productAPI.getProductById(id),
        reviewAPI.getReviewsByProduct(id),
        analysisAPI.calculateProductTrustScore(id),
      ]);

      setProduct(productRes.data.data);
      setReviews(reviewsRes.data.data);
      setTrustScore(trustRes.data.data);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="error">Product not found</div>;

  const getTrustColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#2196F3';
    if (score >= 40) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="product-detail">
      <div className="product-header">
        <div className="product-image-large">
          {product.image ? (
            <img src={`http://localhost:5000${product.image}`} alt={product.name} />
          ) : (
            <div className="no-image-large">No Image Available</div>
          )}
        </div>

        <div className="product-header-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="category">{product.category}</p>
          <p className="description">{product.description}</p>

          <div className="rating-section">
            <div className="rating-value">
              ⭐ {product.averageRating.toFixed(1)} out of 5
            </div>
            <div className="reviews-count">
              Based on {product.totalReviews} reviews
            </div>
          </div>

          {trustScore && (
            <div className="trust-section">
              <h3>Product Trust Score</h3>
              <div className="trust-display">
                <div className="trust-circle">
                  <div
                    className="trust-circle-inner"
                    style={{
                      background: `conic-gradient(${getTrustColor(
                        trustScore.trustScore
                      )} 0deg ${(trustScore.trustScore / 100) * 360}deg, #e0e0e0 0deg)`,
                    }}
                  >
                    <span>{trustScore.trustScore}%</span>
                  </div>
                </div>
                <div className="trust-info">
                  <p className="trust-level">{trustScore.trustLevel}</p>
                  <p className="trust-recommendation">{trustScore.recommendation}</p>
                </div>
              </div>

              <div className="trust-factors">
                <h4>Trust Score Factors:</h4>
                <div className="factor">
                  <span>Review Authenticity:</span>
                  <span className="value">
                    {trustScore.factors.reviewAuthenticityScore.toFixed(0)}%
                  </span>
                </div>
                <div className="factor">
                  <span>Verified Purchases:</span>
                  <span className="value">
                    {trustScore.factors.verifiedPurchaseRatio.toFixed(0)}%
                  </span>
                </div>
                <div className="factor">
                  <span>Review Consistency:</span>
                  <span className="value">
                    {trustScore.factors.reviewConsistency.toFixed(0)}%
                  </span>
                </div>
                <div className="factor">
                  <span>Rating Distribution:</span>
                  <span className="value">
                    {trustScore.factors.ratingDistribution.toFixed(0)}%
                  </span>
                </div>
              </div>

              {product.fakeReviewsCount > 0 && (
                <div className="warning-box">
                  ⚠️ {product.fakeReviewsCount} suspicious reviews detected out of{' '}
                  {product.totalReviews}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
        <button
          className={`tab ${activeTab === 'analyzer' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyzer')}
        >
          Review Analyzer
        </button>
        <button
          className={`tab ${activeTab === 'add-review' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-review')}
        >
          Add Review
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <h2>Customer Reviews ({reviews.length})</h2>
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <ReviewItem key={review._id} review={review} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analyzer' && (
          <div className="analyzer-section">
            <ReviewAnalyzer />
          </div>
        )}

        {activeTab === 'add-review' && (
          <div className="form-section">
            <ReviewForm
              productId={id}
              onReviewSubmitted={() => {
                fetchProductData();
                setActiveTab('reviews');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
