import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiAlertCircle } from 'react-icons/fi';
import { customerAPI } from '../services/api';
import '../styles/customerform.css';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',  // ⚠️ CHANGED: Backend expects 'Active' not 'active'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      // ✅ FIXED: Use customerAPI instead of direct fetch
      await customerAPI.createCustomer(formData);
      
      // Success!
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active',  // ⚠️ CHANGED: 'Active' not 'active'
      });
      
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error.message || 'Failed to add customer. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'Active',  // ⚠️ CHANGED: 'Active' not 'active'
    });
    setErrors({});
    setSuccess(false);
  };

  return (
    <div className="customer-form-container">
      <div className="form-header">
        <h2>Add New Customer</h2>
        <p>Fill in the details to add a new customer to your database</p>
      </div>

      <form className="customer-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">
              <FiUser className="label-icon" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter customer name"
            />
            {errors.name && (
              <span className="error-message">
                <FiAlertCircle /> {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FiMail className="label-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="customer@example.com"
            />
            {errors.email && (
              <span className="error-message">
                <FiAlertCircle /> {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <FiPhone className="label-icon" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && (
              <span className="error-message">
                <FiAlertCircle /> {errors.phone}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">
              <FiUser className="label-icon" />
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {/* ⚠️ CHANGED: Values to 'Active' and 'Inactive' to match backend */}
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="address">
            <FiMapPin className="label-icon" />
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            placeholder="Enter customer address"
            rows="3"
          ></textarea>
          {errors.address && (
            <span className="error-message">
              <FiAlertCircle /> {errors.address}
            </span>
          )}
        </div>

        {errors.submit && (
          <div className="submit-error">
            <FiAlertCircle /> {errors.submit}
          </div>
        )}

        {success && (
          <div className="submit-success">
            ✓ Customer added successfully!
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleClearForm}
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            <FiSave />
            {loading ? 'Saving...' : 'Save Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;