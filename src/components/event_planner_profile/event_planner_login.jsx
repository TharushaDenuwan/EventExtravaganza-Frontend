import React, { useState } from 'react';
import styles from '../event_planner_login/event_planner_login.module.css';
import { useNavigate } from "react-router-dom";

export default function EventPlannerLogin() {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    ContactNumber: '', // Added Contact Number
    Password: '',
    ConfirmPassword: '',
    Address: '',
    City: '',
    Gender: '',
    Speciality: 'Weddings', // Default value for the dropdown
    Budget: '',
    Experience: '',
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
      ContactNumber: formData.ContactNumber, // Include Contact Number
      Password: formData.Password,
      Address: formData.Address,
      City: formData.City,
      Gender: formData.Gender,
      Speciality: formData.Speciality,
      Budget: formData.Budget,
      Experience: formData.Experience,
    };

    try {
      // Send POST request to the backend
      const response = await fetch('http://localhost:5000/plannerProfile/create', {
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

        localStorage.setItem('planner', JSON.stringify({
          name: formData.FullName,
          email: formData.Email,
          contactNumber:formData.ContactNumber,
          password: formData.Password, // Optional (avoid storing plaintext passwords)
          confirmPassword: formData.ConfirmPassword, // Optional
          address: formData.Address,
          city: formData.City,
          gender: formData.Gender,
          speciality: formData.Speciality,
          budget: formData.Budget,
          experience: formData.Experience
      }));

        navigate('/Home_PAGE');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Create Event Planner Account</h1>
      <p className={styles.p1}>Provide correct information to setup your account</p>

      <div className={styles.container}>
        <form className={styles.container2} onSubmit={handleSubmit}>
          <div className={styles.box1}>
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

            <label className={styles.l1} htmlFor="ContactNumber">Contact Number</label> <br />
            <input
              className={styles.i1}
              type="tel"
              name="ContactNumber"
              placeholder="Enter your contact number"
              value={formData.ContactNumber}
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

            <label className={styles.l1} htmlFor="Address">Address</label> <br />
            <input
              className={styles.i1}
              type="text"
              name="Address"
              placeholder="Enter address"
              value={formData.Address}
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
          </div>

          <div className={styles.box2}>
            <label className={styles.l1} htmlFor="Gender">Gender</label> <br />
            <input
              className={styles.i1}
              type="text"
              name="Gender"
              placeholder="Enter your gender"
              value={formData.Gender}
              onChange={handleInputChange}
              required
            />

            <br /> <br />

            <label className={styles.l1} htmlFor="Speciality">Speciality</label> <br />
            <select
              className={styles.i1}
              name="Speciality"
              value={formData.Speciality}
              onChange={handleInputChange}
              required
            >
              <option value="Weddings">Weddings</option>
              <option value="Parties">Parties</option>
              <option value="Both">Both</option>
            </select>

            <br /> <br />

            <label className={styles.l1} htmlFor="Budget">Highest Budget Value</label> <br />
            <input
              className={styles.i1}
              type="number"
              name="Budget"
              placeholder="Enter your highest budget value"
              value={formData.Budget}
              onChange={handleInputChange}
              required
            />

            <br /> <br />

            <label className={styles.l1} htmlFor="Experience">Your Experience</label> <br />
            <textarea
              className={styles.textarea}
              name="Experience"
              placeholder="Enter your experience"
              value={formData.Experience}
              onChange={handleInputChange}
              required
            />

            <br />

            <button className={styles.b1} type="submit">Sign up</button>
            <p className={styles.p2}>
              Already have an account? <span onClick={()=> navigate('/planner_signin')} className={styles.span}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}