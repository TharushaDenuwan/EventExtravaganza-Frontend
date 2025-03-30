import React, { useState } from "react";
import styles from "./event_organizer_signin.module.css";
import { useNavigate } from "react-router-dom";

export default function EventOrganizerSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Step 1: Authenticate the user
      const loginResponse = await fetch("http://localhost:5000/organizerLogin/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        alert("Incorrect password or email");
        return;
      }

      // Step 2: Fetch organizer details using the email
      const organizerResponse = await fetch("http://localhost:5000/organizerProfile2/getOrganizerByMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const organizerData = await organizerResponse.json();

      if (!organizerResponse.ok) {
        setError("Failed to fetch organizer details.");
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
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h1 className={styles.h1}>Event Organizer Sign In</h1>
        <br />
        <p className={styles.p1}>Provide correct information to sign in</p>
        <br />

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className={styles.l1} htmlFor="email">Email</label>
          <br />
          <input
            className={styles.i1}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br />
          <br />

          <label className={styles.l1} htmlFor="password">Password</label>
          <br />
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