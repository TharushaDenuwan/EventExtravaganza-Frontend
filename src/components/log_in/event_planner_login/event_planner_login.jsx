
import React, { useState,useEffect } from 'react';
import styles from '../event_planner_login/event_planner_login.module.css';

import { useNavigate } from "react-router-dom";
import GoogleMapEditableMakerComponent from '../../../map/google_map_editable_maker_component';

export default function EventPlannerLogin() {
  const [latitude, setLatitude] = useState([]); // To store the coordinates
  const [longitude, setLongitude] = useState(null); // To store error message
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    ContactNumber: '',
    Password: '',
    ConfirmPassword: '',
    Address: '',
    City: '',
    Gender: '',
    Speciality: 'Weddings',
    Budget: '',
    Experience: '',
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
      ContactNumber: formData.ContactNumber,
      Password: formData.Password,
      Address: formData.Address,
      City: formData.City,
      Gender: formData.Gender,
      Speciality: formData.Speciality,
      Budget: formData.Budget,
      Experience: formData.Experience,
      latitude,
      longitude
    };

    try {
      const response = await fetch('http://localhost:5000/plannerProfile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Account created successfully!');
        console.log(result);

        localStorage.setItem('planner', JSON.stringify({
          name: formData.FullName,
          email: formData.Email,
          contactNumber: formData.ContactNumber,
          password: formData.Password,
          confirmPassword: formData.ConfirmPassword,
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

      // Function to handle city name update from child component
      const handleCityUpdate = (cityName, latitude, longitude) => {
        // Update the city state
        setFormData({
          ...formData,
          ['City']: cityName,
        });

        setLatitude(latitude);
        setLongitude(longitude);

      };

  return (
    <div className={styles.main}>
      

      <div className={styles.container}>
        <form className={styles.container2} onSubmit={handleSubmit}>
          <div className={styles.box1}>
          <h1 className={styles.h1}>Create Event Planner Account</h1>
          <p className={styles.p1}>Provide correct information to setup your account</p>

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

            <div className={styles.l1} >
                <h1>Select your location</h1>
                <GoogleMapEditableMakerComponent onCityUpdate={handleCityUpdate} />
              </div>
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