import React, { useState } from 'react';
import styles from '../event_planner_login/event_planner_login.module.css';
import { useNavigate } from "react-router-dom";
import GoogleMapEditableMakerComponent from '../../../map/google_map_editable_maker_component';
import WeeklyAvailability from "../../weekly_availability/weekly_availability";

export default function EventPlannerLogin() {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState(null);
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

  const [errors, setErrors] = useState({
    FullName: '',
    Email: '',
    ContactNumber: '',
    Password: '',
    ConfirmPassword: '',
    Address: '',
    City: '',
    Gender: '',
    Budget: '',
    Experience: '',
    general: ''
  });
  
  const [availabilityData, setAvailabilityData] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.FullName.trim()) {
      newErrors.FullName = 'Full name is required';
    } else if (formData.FullName.trim().length < 2) {
      newErrors.FullName = 'Full name must be at least 2 characters long';
    }

    // Email validation
    if (!formData.Email.trim()) {
      newErrors.Email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.Email)) {
        newErrors.Email = 'Please enter a valid email address';
      }
    }

    // Password validation
    if (!formData.Password) {
      newErrors.Password = 'Password is required';
    } else if (formData.Password.length < 8) {
      newErrors.Password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[A-Z])/.test(formData.Password)) {
      newErrors.Password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*[0-9])/.test(formData.Password)) {
      newErrors.Password = 'Password must contain at least one number';
    }

    // Confirm Password validation
    if (!formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Please confirm your password';
    } else if (formData.Password !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }

    // Address validation
    if (!formData.Address.trim()) {
      newErrors.Address = 'Address is required';
    }

    // City validation
    if (!formData.City.trim()) {
      newErrors.City = 'City is required';
    }

    // Gender validation
    if (!formData.Gender.trim()) {
      newErrors.Gender = 'Gender is required';
    }

    // Budget validation
    if (!formData.Budget) {
      newErrors.Budget = 'Budget is required';
    } else if (isNaN(formData.Budget) || Number(formData.Budget) <= 0) {
      newErrors.Budget = 'Please enter a valid budget amount';
    }

    // Experience validation
    if (!formData.Experience.trim()) {
      newErrors.Experience = 'Experience details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAvailability = (updatedData) => {
    setAvailabilityData(updatedData);
    console.log("Final Availability Data:", updatedData);
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
      ContactNumber: formData.ContactNumber,
      Password: formData.Password,
      Address: formData.Address,
      City: formData.City,
      Weekly_Availability: availabilityData,
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
          experience: formData.Experience,
          Weekly_Availability: availabilityData
        }));

        navigate('/Home_PAGE');
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

  const handleCityUpdate = (cityName, lat, long) => {
    setFormData({
      ...formData,
      ['City']: cityName,
    });
    setLatitude(lat);
    setLongitude(long);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form className={styles.container2} onSubmit={handleSubmit} noValidate>
          <div className={styles.box1}>
            <h1 className={styles.h1}>Create Event Planner Account</h1>
            <p className={styles.p1}>Provide correct information to setup your account</p>

            {errors.general && (
              <div className={styles.errorText}>{errors.general}</div>
            )}

            <label className={styles.l1} htmlFor="FullName">Full Name</label> <br />
            <input
              className={`${styles.i1} ${errors.FullName ? styles.inputError : ''}`}
              type="text"
              name="FullName"
              placeholder="Enter your name"
              value={formData.FullName}
              onChange={handleInputChange}
            />
            {errors.FullName && <div className={styles.errorText}>{errors.FullName}</div>}

            <br /> <br />

            <label className={styles.l1} htmlFor="Email">Email</label> <br />
            <input
              className={`${styles.i1} ${errors.Email ? styles.inputError : ''}`}
              type="email"
              name="Email"
              placeholder="Enter your email"
              value={formData.Email}
              onChange={handleInputChange}
            />
            {errors.Email && <div className={styles.errorText}>{errors.Email}</div>}

            <br /> <br />

            <label className={styles.l1} htmlFor="Password">Create Password</label> <br />
            <input
              className={`${styles.i1} ${errors.Password ? styles.inputError : ''}`}
              type="password"
              name="Password"
              placeholder="Enter a password"
              value={formData.Password}
              onChange={handleInputChange}
            />
            {errors.Password && <div className={styles.errorText}>{errors.Password}</div>}

            <br /> <br />

            <label className={styles.l1} htmlFor="ConfirmPassword">Confirm Password</label> <br />
            <input
              className={`${styles.i1} ${errors.ConfirmPassword ? styles.inputError : ''}`}
              type="password"
              name="ConfirmPassword"
              placeholder="Enter password again"
              value={formData.ConfirmPassword}
              onChange={handleInputChange}
            />
            {errors.ConfirmPassword && <div className={styles.errorText}>{errors.ConfirmPassword}</div>}

            <br /> <br />

            <label className={styles.l1} htmlFor="Address">Address</label> <br />
            <input
              className={`${styles.i1} ${errors.Address ? styles.inputError : ''}`}
              type="text"
              name="Address"
              placeholder="Enter address"
              value={formData.Address}
              onChange={handleInputChange}
            />
            {errors.Address && <div className={styles.errorText}>{errors.Address}</div>}

            <br /> <br />

            <label className={styles.l1} htmlFor="City">City</label> <br />
            <input
              className={`${styles.i1} ${errors.City ? styles.inputError : ''}`}
              type="text"
              name="City"
              placeholder="Enter city"
              value={formData.City}
              onChange={handleInputChange}
            />
            {errors.City && <div className={styles.errorText}>{errors.City}</div>}

            <div className={styles.l1}>
              <h1>Select your location</h1>
              <GoogleMapEditableMakerComponent onCityUpdate={handleCityUpdate} />
            </div>

            <div>
              <h1>Set Weekly Availability</h1>
              <WeeklyAvailability 
                onSave={handleSaveAvailability}
                initialData={availabilityData}
              />
            </div>
          </div>

          <div className={styles.box2}>
            <label className={styles.l1} htmlFor="Gender">Gender</label> <br />
            <input
              className={`${styles.i1} ${errors.Gender ? styles.inputError : ''}`}
              type="text"
              name="Gender"
              placeholder="Enter your gender"
              value={formData.Gender}
              onChange={handleInputChange}
            />
            {errors.Gender && <div className={styles.errorText}>{errors.Gender}</div>}

            <br /> <br />

            <label className={styles.l1} htmlFor="Speciality">Speciality</label> <br />
            <select
              className={styles.i1}
              name="Speciality"
              value={formData.Speciality}
              onChange={handleInputChange}
            >
              <option value="Weddings">Weddings</option>
              <option value="Parties">Parties</option>
              <option value="Both">Both</option>
            </select>

            <br /> <br />

            <label className={styles.l1} htmlFor="Budget">Highest Budget Value</label> <br />
            <input
              className={`${styles.i1} ${errors.Budget ? styles.inputError : ''}`}
              type="number"
              name="Budget"
              placeholder="Enter your highest budget value"
              value={formData.Budget}
              onChange={handleInputChange}
            />
            {errors.Budget && <div className={styles.errorText}>{errors.Budget}</div>}

            <br /> <br />

            <label className={styles.l1} htmlFor="Experience">Your Experience</label> <br />
            <textarea
              className={`${styles.textarea} ${errors.Experience ? styles.inputError : ''}`}
              name="Experience"
              placeholder="Enter your experience"
              value={formData.Experience}
              onChange={handleInputChange}
            />
            {errors.Experience && <div className={styles.errorText}>{errors.Experience}</div>}

            <br />

            <button 
              className={styles.b1} 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign up'}
            </button>
            <p className={styles.p2}>
              Already have an account? <span onClick={() => navigate('/planner_signin')} className={styles.span}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}