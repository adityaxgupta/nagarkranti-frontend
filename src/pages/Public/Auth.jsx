import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/Auth.module.css';

export default function PublicAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    aadharNumber: '',
    aadharImage: null,
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false); // Track transition state

  const handleToggle = () => {
    setIsTransitioning(true); // Start transition
    setTimeout(() => {
      setIsLogin(!isLogin); // Toggle form after fade-out
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        aadharNumber: '',
        aadharImage: null,
        password: '',
      });
      setErrors({});
      setIsTransitioning(false); // End transition
    }, 300); // Match the duration of the CSS transition
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required.';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required.';
      }
      if (!formData.aadharImage) {
        newErrors.aadharImage = 'Aadhar card image is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        // Handle login logic
        console.log('Logging in...', formData);
        navigate('/public'); // Redirect to public homepage after login
      } else {
        // Handle signup logic
        console.log('Signing up...', formData);
        navigate('/public'); // Redirect to public homepage after signup
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.overlay}>
        <div className={styles.authBox}>
          <div className={styles.toggleContainer}>
            <button
              className={`${styles.toggleButton} ${isLogin ? styles.active : ''}`}
              onClick={handleToggle}
            >
              Login
            </button>
            <button
              className={`${styles.toggleButton} ${!isLogin ? styles.active : ''}`}
              onClick={handleToggle}
            >
              Signup
            </button>
          </div>

          <form
            key={isLogin ? 'login' : 'signup'} // Force re-render on toggle
            onSubmit={handleSubmit}
            className={`${styles.authForm} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}
          >
            {!isLogin && (
              <div className={styles.nameRow}>
                <div className={styles.inputGroup}>
                  <label>First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                </div>
                <div className={styles.inputGroup}>
                  <label>Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Middle Name"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                  {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                </div>
              </div>
            )}

            <div className={styles.inputGroup}>
              <label>Aadhar Number*</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="Enter your 12-digit Aadhar number"
                maxLength="12"
              />
              {errors.aadharNumber && <span className={styles.error}>{errors.aadharNumber}</span>}
            </div>

            {!isLogin && (
              <div className={styles.inputGroup}>
                <label>Aadhar Card Image*</label>
                <input
                  type="file"
                  name="aadharImage"
                  onChange={handleChange}
                  accept="image/*"
                />
                {errors.aadharImage && <span className={styles.error}>{errors.aadharImage}</span>}
              </div>
            )}

            <div className={styles.inputGroup}>
              <label>Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}