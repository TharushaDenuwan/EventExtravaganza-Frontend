import React, { useState } from "react";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/footer/footer";
import styles from "./budget_filtering.module.css";
import { Search, DollarSign, Users } from "lucide-react";

export default function BudgetFiltering() {
  const [budget, setBudget] = useState("");
  const [eventPlanners, setEventPlanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!budget) {
      setError("Please enter a budget amount");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/budgetFilter/budget",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Budget: budget }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch event planners");
      }

      const data = await response.json();
      setEventPlanners(data);
    } catch (error) {
      setError(
        "An error occurred while fetching event planners. Please try again."
      );
      console.error("Error fetching event planners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.titleWrapper}>
            <div className={styles.pipe}></div>
            <h3 className={styles.subtitle}>Extravaganza unit</h3>
          </div>

          <h1 className={styles.title}>
            Loved By Event Organizers.
            <br />
            Built for <span className={styles.highlight}>Budget Filtering</span>
          </h1>

          <p className={styles.description}>
            Finding the perfect event planner within your budget has never been
            easier! Simply enter your desired budget range, and our system will
            instantly display a list of available event planners that match your
            price preferences.
          </p>
        </div>

        <div className={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
            alt="Event Planning"
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.inputWrapper}>
            <DollarSign className={styles.currencyIcon} />
            <input
              type="number"
              placeholder="Enter Your Budget Range"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.input}
            />
          </div>
          <button
            className={styles.searchButton}
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                <Search className={styles.searchIcon} />
                Search
              </>
            )}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.resultsContainer}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              <Users className={styles.usersIcon} />
              Available Event Planners
            </h2>
            <div className={styles.divider}></div>
          </div>

          <div className={styles.plannerGrid}>
            {eventPlanners.length > 0 ? (
              eventPlanners.map((planner, index) => (
                <div key={index} className={styles.plannerCard}>
                  <div className={styles.plannerAvatar}>
                    {planner.FullName.charAt(0)}
                  </div>
                  <div className={styles.plannerInfo}>
                    <h3 className={styles.plannerName}>{planner.FullName}</h3>
                    <p className={styles.plannerEmail}>{planner.Email}</p>
                  </div>
                  <button className={styles.viewProfileButton}>
                    View Profile
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.noResults}>
                {isLoading
                  ? "Searching for event planners..."
                  : "No event planners found within the specified budget."}
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
