import React, { useState } from "react";
import styles from "./event_organizer_signin.module.css";
import { useNavigate } from "react-router-dom";

export default function EventOrganizerSignin() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
        general: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({ ...errors, general: "" });

    try {
      // Step 1: Authenticate the user
      const loginResponse = await fetch("http://localhost:5000/organizerLogin/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          Email: formData.email, 
          Password: formData.password 
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setErrors({
          ...errors,
          general: "Incorrect email or password"
        });
        return;
      }

      // Step 2: Fetch organizer details using the email
      const organizerResponse = await fetch("http://localhost:5000/organizerProfile2/getOrganizerByMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const organizerData = await organizerResponse.json();

      if (!organizerResponse.ok) {
        setErrors({
          ...errors,
          general: "Failed to fetch organizer details"
        });
        return;
      }

      // Step 3: Store organizer details in local storage
      localStorage.setItem('organizer', JSON.stringify({
        name: organizerData.FullName,
        city: organizerData.City,
        email: organizerData.Email,
        contactNumber: organizerData.ContactNumber,
      }));

      // Step 4: Redirect to the profile page
      navigate("/Home");
    } catch (error) {
      console.error('Error during sign in:', error);
      setErrors({
        ...errors,
        general: "Network error. Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h1 className={styles.h1}>Event Organizer Sign In</h1>
        <br />
        <p className={styles.p1}>Provide correct information to sign in</p>
        <br />

        {errors.general && (
          <div className={styles.errorText}>{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label className={styles.l1} htmlFor="email">Email</label>
          <br />
          <input
            className={`${styles.i1} ${errors.email ? styles.inputError : ""}`}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className={styles.errorText}>{errors.email}</div>}

          <br />
          <br />

          <label className={styles.l1} htmlFor="password">Password</label>
          <br />
          <input
            className={`${styles.i1} ${errors.password ? styles.inputError : ""}`}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className={styles.errorText}>{errors.password}</div>}

          <br />

          <button 
            className={styles.b1} 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}