import React, { useState } from "react";
import styles from "./event_planner_signin.module.css";
import { useNavigate } from "react-router-dom"; // For navigation

export default function EventPlannerSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!email || !password) {
      setError("Please enter both email and password.");
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
        alert("Incorrect password or email");
        return;
      }

      // Step 2: Fetch planner details using the email
      const plannerResponse = await fetch("http://localhost:5000/plannerProfile2/getPlannerByMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Send email in the request body
      });

      const plannerData = await plannerResponse.json();

      if (!plannerResponse.ok) {
        setError("Failed to fetch planner details.");
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
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h1 className={styles.h1}>Event Planner Sign In</h1> <br />
        <p className={styles.p1}>Provide correct information to sign in</p> <br />

        {error && <p className={styles.error}>{error}</p>} {/* Show error message */}

        <form onSubmit={handleSubmit}>
          <label className={styles.l1} htmlFor="email">Email</label> <br />
          <input
            className={styles.i1}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br /> <br />

          <label className={styles.l1} htmlFor="password">Password</label> <br />
          <input
            className={styles.i1}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br />

          <button className={styles.b1} type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}