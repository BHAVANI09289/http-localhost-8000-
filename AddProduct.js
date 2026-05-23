import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import '../styles/AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (!formData.name || !formData.description || !formData.price || !formData.category) {
        setError('All fields are required');
        return;
      }

      await productAPI.createProduct(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to create product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && <p className="file-name">{formData.image.name}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
