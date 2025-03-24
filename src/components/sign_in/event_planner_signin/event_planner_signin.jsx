import React, { useState } from "react";
import styles from "./event_planner_signin.module.css";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from 'lucide-react';

export default function EventPlannerSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newFieldErrors = { email: "", password: "" };

    // Email validation
    if (!email) {
      newFieldErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newFieldErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newFieldErrors.password = "Password is required";
      isValid = false;
    }

    setFieldErrors(newFieldErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({ email: "", password: "" });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Authenticate the user
      const loginResponse = await fetch("http://localhost:5000/plannerLogin/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Invalid email or password");
      }

      // Step 2: Fetch planner details using the email
      const plannerResponse = await fetch("http://localhost:5000/plannerProfile2/getPlannerByMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!plannerResponse.ok) {
        throw new Error("Failed to fetch planner details");
      }

      const plannerData = await plannerResponse.json();

      // Step 3: Store planner details in local storage
      localStorage.setItem('planner', JSON.stringify({
        name: plannerData.FullName,
        email: plannerData.Email,
        contactNumber: plannerData.ContactNumber,
        address: plannerData.Address,
        city: plannerData.City,
        gender: plannerData.Gender,
        speciality: plannerData.Speciality,
        budget: plannerData.Budget,
        experience: plannerData.Experience,
        Weekly_Availability: plannerData.Weekly_Availability,
      }));

      // Step 4: Redirect to the profile page
      navigate("/Home_PAGE");
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setError("Unable to connect to the server. Please check your internet connection.");
      } else {
        setError(error.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <div className={styles.headerSection}>
          <h1 className={styles.h1}>Welcome Back</h1>
          <p className={styles.p1}>Sign in to continue planning amazing events</p>
        </div>

        {error && (
          <div className={styles.error}>
            <AlertCircle className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.l1} htmlFor="email">Email Address</label>
            <input
              className={`${styles.i1} ${fieldErrors.email ? styles.inputError : ''}`}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors(prev => ({ ...prev, email: "" }));
              }}
              disabled={isLoading}
            />
            {fieldErrors.email && (
              <span className={styles.fieldError}>{fieldErrors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.l1} htmlFor="password">Password</label>
            <input
              className={`${styles.i1} ${fieldErrors.password ? styles.inputError : ''}`}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors(prev => ({ ...prev, password: "" }));
              }}
              disabled={isLoading}
            />
            {fieldErrors.password && (
              <span className={styles.fieldError}>{fieldErrors.password}</span>
            )}
          </div>

          <button 
            className={`${styles.b1} ${isLoading ? styles.loading : ''} relative`}
            type="submit"
            disabled={isLoading}
          >
            <span className={isLoading ? 'opacity-0' : ''}>Sign in</span>
            {isLoading && (
              <div className={styles.spinner}></div>
            )}
          </button>
        </form>

        <p className={styles.p2}>
          Don't have an account?{' '}
          <span 
            className={styles.span}
            onClick={() => navigate("/planner_login")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}