import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/Auth.module.css';

export default function MunicipalAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    employeeId: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false); 

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        employeeId: '',
        password: '',
      });
      setErrors({});
      setIsTransitioning(false); 
    }, 300); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId || formData.employeeId.length !== 8) {
      newErrors.employeeId = 'Employee ID must be 8 digits.';
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        console.log('Logging in...', formData);
        navigate('/municipal');
      } else {
        console.log('Signing up...', formData);
        navigate('/municipal'); 
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
            key={isLogin ? 'login' : 'signup'} 
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
              <label>Employee ID*</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="Enter your 8-digit Employee ID"
                maxLength="8"
              />
              {errors.employeeId && <span className={styles.error}>{errors.employeeId}</span>}
            </div>

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