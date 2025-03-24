import React, { useState } from 'react';
import styles from './event_organizer_login.module.css';
import { useNavigate } from 'react-router-dom';

export default function EventOrganizerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    City: '',
    ContactNumber: '',
  });

  const [errors, setErrors] = useState({
    FullName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    City: '',
    ContactNumber: '',
    general: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Empty field validations
    if (!formData.FullName.trim()) {
      newErrors.FullName = 'Full name is required';
    } else if (formData.FullName.trim().length < 2) {
      newErrors.FullName = 'Full name must be at least 2 characters long';
    }

    if (!formData.Email.trim()) {
      newErrors.Email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.Email)) {
        newErrors.Email = 'Please enter a valid email address';
      }
    }

    if (!formData.Password) {
      newErrors.Password = 'Password is required';
    } else if (formData.Password.length < 8) {
      newErrors.Password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[A-Z])/.test(formData.Password)) {
      newErrors.Password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*[0-9])/.test(formData.Password)) {
      newErrors.Password = 'Password must contain at least one number';
    }

    if (!formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Please confirm your password';
    } else if (formData.Password !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }

    if (!formData.City.trim()) {
      newErrors.City = 'City is required';
    } else if (formData.City.trim().length < 2) {
      newErrors.City = 'Please enter a valid city name';
    }

    if (!formData.ContactNumber.trim()) {
      newErrors.ContactNumber = 'Contact number is required';
    } else {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.ContactNumber)) {
        newErrors.ContactNumber = 'Please enter a valid contact number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
        general: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({ ...errors, general: '' });

    const dataToSend = {
      FullName: formData.FullName,
      Email: formData.Email,
      Password: formData.Password,
      City: formData.City,
      ContactNumber: formData.ContactNumber,
    };

    try {
      const response = await fetch('http://localhost:5000/organizerProfile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      
      if (response.ok) {
        localStorage.setItem('organizer', JSON.stringify({
          name: formData.FullName,
          city: formData.City,
          email: formData.Email,
          contactNumber: formData.ContactNumber,
        }));

        navigate('/Home');
      } else {
        setErrors({
          ...errors,
          general: result.message || 'Failed to create account. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        ...errors,
        general: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h1 className={styles.h1}>Create Event Organizer Account</h1>
        <p className={styles.p1}>Provide correct information to setup your account</p>

        {errors.general && (
          <div className={styles.errorText}>{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label className={styles.l1} htmlFor="FullName">Full Name</label>
          <input
            className={`${styles.i1} ${errors.FullName ? styles.inputError : ''}`}
            type="text"
            id="FullName"
            name="FullName"
            placeholder="Enter your name"
            value={formData.FullName}
            onChange={handleInputChange}
          />
          {errors.FullName && <div className={styles.errorText}>{errors.FullName}</div>}

          <label className={styles.l1} htmlFor="Email">Email</label>
          <input
            className={`${styles.i1} ${errors.Email ? styles.inputError : ''}`}
            type="email"
            id="Email"
            name="Email"
            placeholder="Enter your email"
            value={formData.Email}
            onChange={handleInputChange}
          />
          {errors.Email && <div className={styles.errorText}>{errors.Email}</div>}

          <label className={styles.l1} htmlFor="Password">Create Password</label>
          <input
            className={`${styles.i1} ${errors.Password ? styles.inputError : ''}`}
            type="password"
            id="Password"
            name="Password"
            placeholder="Enter a password"
            value={formData.Password}
            onChange={handleInputChange}
          />
          {errors.Password && <div className={styles.errorText}>{errors.Password}</div>}

          <label className={styles.l1} htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            className={`${styles.i1} ${errors.ConfirmPassword ? styles.inputError : ''}`}
            type="password"
            id="ConfirmPassword"
            name="ConfirmPassword"
            placeholder="Enter password again"
            value={formData.ConfirmPassword}
            onChange={handleInputChange}
          />
          {errors.ConfirmPassword && <div className={styles.errorText}>{errors.ConfirmPassword}</div>}

          <label className={styles.l1} htmlFor="City">City</label>
          <input
            className={`${styles.i1} ${errors.City ? styles.inputError : ''}`}
            type="text"
            id="City"
            name="City"
            placeholder="Enter city"
            value={formData.City}
            onChange={handleInputChange}
          />
          {errors.City && <div className={styles.errorText}>{errors.City}</div>}

          <label className={styles.l1} htmlFor="ContactNumber">Contact Number</label>
          <input
            className={`${styles.i1} ${errors.ContactNumber ? styles.inputError : ''}`}
            type="tel"
            id="ContactNumber"
            name="ContactNumber"
            placeholder="Enter your contact number"
            value={formData.ContactNumber}
            onChange={handleInputChange}
          />
          {errors.ContactNumber && <div className={styles.errorText}>{errors.ContactNumber}</div>}

          <button 
            className={styles.b1} 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className={styles.p2}>
          Already have an account? <span onClick={() => navigate('/organizer_signin')} className={styles.span}>Login</span>
        </p>
      </div>
    </div>
  );
}