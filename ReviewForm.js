import React, { useState } from 'react';
import { reviewAPI } from '../services/api';
import '../styles/ReviewForm.css';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    text: '',
    verifiedPurchase: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await reviewAPI.createReview({
        productId,
        userId: 'user_' + Date.now(),
        userName: 'Anonymous User',
        ...formData,
      });
      setMessage({ type: 'success', text: 'Review submitted successfully!' });
      setFormData({ rating: 5, title: '', text: '', verifiedPurchase: false });
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit review' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating:</label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Brief title for your review"
            required
          />
        </div>

        <div className="form-group">
          <label>Review Text:</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Share your detailed review..."
            rows={5}
            required
          />
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="verifiedPurchase"
            checked={formData.verifiedPurchase}
            onChange={handleChange}
          />
          <label>I purchased this product</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
