import React, { useState } from 'react';
import { analysisAPI } from '../services/api';
import '../styles/ReviewAnalyzer.css';

const ReviewAnalyzer = ({ onAnalysis }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const response = await analysisAPI.detectFakeReview({
        text,
        rating,
      });
      setAnalysis(response.data.data);
      if (onAnalysis) {
        onAnalysis(response.data.data);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-analyzer">
      <h3>Analyze Review for Authenticity</h3>
      <div className="form-group">
        <label>Review Text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter review text..."
          rows={5}
        />
      </div>

      <div className="form-group">
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Fair</option>
          <option value={3}>3 - Good</option>
          <option value={4}>4 - Very Good</option>
          <option value={5}>5 - Excellent</option>
        </select>
      </div>

      <button onClick={handleAnalyze} disabled={!text || loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {analysis && (
        <div className={`analysis-result ${analysis.isFake ? 'fake' : 'authentic'}`}>
          <h4>Analysis Result</h4>
          <div className="result-item">
            <strong>Status:</strong>
            <span>{analysis.isFake ? '🚩 Likely Fake' : '✅ Likely Authentic'}</span>
          </div>
          <div className="result-item">
            <strong>Fake Score:</strong>
            <span>{analysis.fakeScore}%</span>
          </div>
          <div className="result-item">
            <strong>Sentiment:</strong>
            <span>{analysis.analysisDetails.sentimentScore}%</span>
          </div>
          <div className="result-item">
            <strong>Language Quality:</strong>
            <span>{analysis.analysisDetails.languageQuality}</span>
          </div>
          {analysis.analysisDetails.suspiciousPatterns.length > 0 && (
            <div className="result-item">
              <strong>Suspicious Patterns:</strong>
              <ul>
                {analysis.analysisDetails.suspiciousPatterns.map((pattern, idx) => (
                  <li key={idx}>{pattern}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewAnalyzer;
