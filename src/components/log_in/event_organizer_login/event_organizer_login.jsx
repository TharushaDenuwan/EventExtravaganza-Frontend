import React, { useState } from 'react';
import styles from '../event_organizer_login/event_organizer_login.module.css';
import { useNavigate } from "react-router-dom";


export default function EventOrganizerLogin() {
  // State to store form data
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    City: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate passwords match
    if (formData.Password !== formData.ConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Prepare data to send to the backend
    const dataToSend = {
      FullName: formData.FullName,
      Email: formData.Email,
      Password: formData.Password,
      City: formData.City,
    };

    try {
      // Send POST request to the backend
      const response = await fetch('http://localhost:5000/organizerProfile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      // Handle response
      const result = await response.json();
      if (response.ok) {
        alert('Account created successfully!');
        console.log(result);
        navigate("/Home");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h1 className={styles.h1}>Create Event Organizer Account</h1>
        <p className={styles.p1}>Provide correct information to setup your account</p>

        <br />

        <form onSubmit={handleSubmit}>
          <label className={styles.l1} htmlFor="FullName">Full Name</label> <br />
          <input
            className={styles.i1}
            type="text"
            name="FullName"
            placeholder="Enter your name"
            value={formData.FullName}
            onChange={handleInputChange}
            required
          />

          <br /> <br />

          <label className={styles.l1} htmlFor="Email">Email</label> <br />
          <input
            className={styles.i1}
            type="email"
            name="Email"
            placeholder="Enter your email"
            value={formData.Email}
            onChange={handleInputChange}
            required
          />

          <br /> <br />

          <label className={styles.l1} htmlFor="Password">Create Password</label> <br />
          <input
            className={styles.i1}
            type="password"
            name="Password"
            placeholder="Enter a password"
            value={formData.Password}
            onChange={handleInputChange}
            required
          />

          <br /> <br />

          <label className={styles.l1} htmlFor="ConfirmPassword">Confirm Password</label> <br />
          <input
            className={styles.i1}
            type="password"
            name="ConfirmPassword"
            placeholder="Enter password again"
            value={formData.ConfirmPassword}
            onChange={handleInputChange}
            required
          />

          <br /> <br />

          <label className={styles.l1} htmlFor="City">City</label> <br />
          <input
            className={styles.i1}
            type="text"
            name="City"
            placeholder="Enter city"
            value={formData.City}
            onChange={handleInputChange}
            required
          />

          <br />

          <button className={styles.b1} type="submit">Sign up</button>
        </form>

        <p className={styles.p2}>
          Already have an account? <span className={styles.span}>Login</span>
        </p>
      </div>
    </div>
  );
}