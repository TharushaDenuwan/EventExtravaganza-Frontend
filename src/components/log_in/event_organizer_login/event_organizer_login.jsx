import React, { useState } from 'react';
import styles from './event_organizer_login.module.css';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Phone } from 'lucide-react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.ConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }

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
        alert('Account created successfully!');
        localStorage.setItem('organizer', JSON.stringify({
          name: formData.FullName,
          city: formData.City,
          email: formData.Email,
          contactNumber: formData.ContactNumber,
        }));
        navigate('/Home');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h1>Create Event Organizer Account</h1>
          <p>Provide correct information to setup your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="FullName">
              <User size={18} />
              Full Name
            </label>
            <input
              type="text"
              id="FullName"
              name="FullName"
              placeholder="Enter your name"
              value={formData.FullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="Email">
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              placeholder="Enter your email"
              value={formData.Email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="Password">
              <Lock size={18} />
              Create Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Enter a password"
              value={formData.Password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ConfirmPassword">
              <Lock size={18} />
              Confirm Password
            </label>
            <input
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
              placeholder="Enter password again"
              value={formData.ConfirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="City">
              <MapPin size={18} />
              City
            </label>
            <input
              type="text"
              id="City"
              name="City"
              placeholder="Enter city"
              value={formData.City}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ContactNumber">
              <Phone size={18} />
              Contact Number
            </label>
            <input
              type="text"
              id="ContactNumber"
              name="ContactNumber"
              placeholder="Enter your contact number"
              value={formData.ContactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign up
          </button>
        </form>

        <p className={styles.loginLink}>
          Already have an account? 
          <span onClick={() => navigate('/organizer_signin')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}