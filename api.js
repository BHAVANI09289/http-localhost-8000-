import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    if (data.image) {
      formData.append('image', data.image);
    }
    return api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateProduct: (id, data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    if (data.image) {
      formData.append('image', data.image);
    }
    return api.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getTrustScore: (id) => api.get(`/products/${id}/trust-score`),
};

export const reviewAPI = {
  getReviewsByProduct: (productId) =>
    api.get(`/reviews/product/${productId}`),
  getReviewById: (id) => api.get(`/reviews/${id}`),
  createReview: (data) => api.post('/reviews', data),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
  markHelpful: (id, helpful) =>
    api.post(`/reviews/${id}/helpful`, { helpful }),
};

export const analysisAPI = {
  detectFakeReview: (data) => api.post('/analysis/detect-fake', data),
  calculateProductTrustScore: (productId) =>
    api.get(`/analysis/product/${productId}/trust-score`),
  calculateReviewTrustScore: (reviewId) =>
    api.get(`/analysis/review/${reviewId}/trust-score`),
  batchAnalyzeReviews: (reviews) =>
    api.post('/analysis/batch-analyze', { reviews }),
};

export default api;
