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
      <div className={styles.box1}>
        <h1 className={styles.h1}>Create Event Organizer Account</h1>
        <p className={styles.p1}>Provide correct information to setup your account</p>

        <form onSubmit={handleSubmit}>
          <label className={styles.l1} htmlFor="FullName">Full Name</label>
          <input
            className={styles.i1}
            type="text"
            id="FullName"
            name="FullName"
            placeholder="Enter your name"
            value={formData.FullName}
            onChange={handleInputChange}
            required
          />

          <label className={styles.l1} htmlFor="Email">Email</label>
          <input
            className={styles.i1}
            type="email"
            id="Email"
            name="Email"
            placeholder="Enter your email"
            value={formData.Email}
            onChange={handleInputChange}
            required
          />

          <label className={styles.l1} htmlFor="Password">Create Password</label>
          <input
            className={styles.i1}
            type="password"
            id="Password"
            name="Password"
            placeholder="Enter a password"
            value={formData.Password}
            onChange={handleInputChange}
            required
          />

          <label className={styles.l1} htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            className={styles.i1}
            type="password"
            id="ConfirmPassword"
            name="ConfirmPassword"
            placeholder="Enter password again"
            value={formData.ConfirmPassword}
            onChange={handleInputChange}
            required
          />

          <label className={styles.l1} htmlFor="City">City</label>
          <input
            className={styles.i1}
            type="text"
            id="City"
            name="City"
            placeholder="Enter city"
            value={formData.City}
            onChange={handleInputChange}
            required
          />

          <label className={styles.l1} htmlFor="ContactNumber">Contact Number</label>
          <input
            className={styles.i1}
            type="tel"
            id="ContactNumber"
            name="ContactNumber"
            placeholder="Enter your contact number"
            value={formData.ContactNumber}
            onChange={handleInputChange}
            required
          />

          <button className={styles.b1} type="submit">Create Account</button>
        </form>

        <p className={styles.p2}>
          Already have an account? <span onClick={() => navigate('/organizer_signin')} className={styles.span}>Login</span>
        </p>
      </div>
    </div>
  );
}