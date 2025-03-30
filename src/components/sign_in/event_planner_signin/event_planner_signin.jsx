import React, { useState } from "react";
import styles from "./event_planner_signin.module.css";
import { useNavigate } from "react-router-dom";

export default function EventPlannerSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Authenticate the user
      const loginResponse = await fetch("http://localhost:5000/plannerLogin/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      // Step 2: Fetch planner details using the email
      const plannerResponse = await fetch("http://localhost:5000/plannerProfile2/getPlannerByMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const plannerData = await plannerResponse.json();

      if (!plannerResponse.ok) {
        setError("Failed to fetch planner details. Please try again.");
        setIsLoading(false);
        return;
      }

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
      }));

      // Step 4: Redirect to the profile page
      navigate("/Home_PAGE");
    } catch (error) {
      setError("An error occurred. Please check your connection and try again.");
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

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.l1} htmlFor="email">Email Address</label>
            <input
              className={styles.i1}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.l1} htmlFor="password">Password</label>
            <input
              className={styles.i1}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button 
            className={`${styles.b1} ${isLoading ? styles.loading : ''}`} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className={styles.p2}>
          Don't have an account?
          <span className={styles.span} onClick={() => navigate("/planner_signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}