import React from 'react';
import '../styles/ReviewItem.css';

const ReviewItem = ({ review }) => {
  const getRiskLevel = (fakeScore) => {
    if (fakeScore >= 70) return 'High Risk';
    if (fakeScore >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  const getRiskColor = (fakeScore) => {
    if (fakeScore >= 70) return '#F44336';
    if (fakeScore >= 40) return '#FF9800';
    return '#4CAF50';
  };

  return (
    <div className={`review-item ${review.isFake ? 'fake-review' : ''}`}>
      <div className="review-header">
        <div>
          <strong>{review.title}</strong>
          <div className="review-meta">
            <span className="rating">{'⭐'.repeat(review.rating)}</span>
            <span className="user">by {review.userName}</span>
            {review.verifiedPurchase && (
              <span className="verified">✓ Verified Purchase</span>
            )}
          </div>
        </div>
        {review.isFake && (
          <div className="fake-badge">⚠️ Suspicious</div>
        )}
      </div>

      <p className="review-text">{review.text}</p>

      <div className="review-footer">
        <div className="helpful">
          <span>👍 {review.helpful}</span>
          <span>👎 {review.unhelpful}</span>
        </div>
        {review.fakeScore !== undefined && (
          <div
            className="fake-score"
            style={{ backgroundColor: getRiskColor(review.fakeScore) }}
          >
            {getRiskLevel(review.fakeScore)}: {review.fakeScore}%
          </div>
        )}
      </div>

      {review.analysisDetails && review.analysisDetails.suspiciousPatterns?.length > 0 && (
        <div className="suspicious-patterns">
          <strong>Patterns detected:</strong>
          {review.analysisDetails.suspiciousPatterns.map((pattern, idx) => (
            <span key={idx} className="pattern-badge">
              {pattern}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
