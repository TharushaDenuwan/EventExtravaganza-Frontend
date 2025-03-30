import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import RatingSystem from "../../rating_system/rating_system"; // Import rating system
import styles from "./event_planner_profile.module.css";
import Navigation from "../../event_planner_site/navigation/navigation";
import Footer from "../../event_planner_site/footer/planner_footer";

export default function EventPlannerProfile() {
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  // Fetch planner data from localStorage
  const plannerData = JSON.parse(localStorage.getItem('planner')) || {
    name: "Udani Lokuhetti",
    city: "Colombo",
    email: "udanilokuhetti22@gmail.com",
    contactNumber: "+94(76) 0876 502",
    gender: "Female",
    address: "123 Event Street, Colombo 07",
    speciality: "Wedding",
    budget: "200000",
  };

  // Fetch checklists for the planner
  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const plannerName = plannerData.name;
        const response = await fetch(`http://localhost:5000/api/checklists/planner/${plannerName}`);

        if (!response.ok) {
          throw new Error("Failed to fetch checklists");
        }

        const checklistsData = await response.json();
        setChecklists(checklistsData); // Update the state with fetched checklists
      } catch (error) {
        console.error("Error fetching checklists:", error);
        setChecklists([]); // Fallback to empty array if error occurs
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchChecklists();
  }, [plannerData.name]);

  return (
    <div>
      <Navigation />
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImageContainer}>
              <img
                src={plannerData.profilePicture || "/placeholder.svg"}
                alt={plannerData.name}
                className={styles.profileImage}
              />
            </div>
            <h1 className={styles.profileName}>{plannerData.name}</h1>

            <Link to="/Checklist" className={styles.checklistButton}>
              Go to Checklist
            </Link>
          </div>

          {/* Display Checklists */}
          <div className={styles.checklistSection}>
            <h2>Checklists</h2>
            {loading ? (
              <p>Loading your checklists...</p>
            ) : checklists.length === 0 ? (
              <p>No checklists available. Start by creating a new one!</p>
            ) : (
              <ul>
                {checklists.map((checklist, index) => (
                  <li key={index} className={styles.checklistItem}>
                    <h3>{checklist.checklistName}</h3>
                    <p>Organizer: {checklist.organizerName}</p>
                    <button 
                      className={styles.viewChecklistButton} 
                      onClick={() => setSelectedChecklist(checklist)}
                    >
                      View Checklist
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div><br/><br/>

          {/* Popup Window for Checklist Details */}
          {selectedChecklist && (
            <div className={styles.popupOverlay} onClick={() => setSelectedChecklist(null)}>
              <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <h2>{selectedChecklist.checklistName}</h2>
                <p><strong>Organizer:</strong> {selectedChecklist.organizerName}</p>

                <h3>Task Details:</h3>
                {selectedChecklist.tasks && selectedChecklist.tasks.length > 0 ? (
                <ul>
                  {selectedChecklist.tasks.map((task, idx) => (
                    <li key={idx}>
                      <strong>{task.name}</strong> - {task.status} ({task.dueDate}) - {task.priority}
                    </li>
                  ))}
                </ul>
                ) : (
                <p>No tasks available.</p>
                )}

                <button onClick={() => setSelectedChecklist(null)}>Close</button>
              </div>
            </div>
          )}


          <div className={styles.profileInfo}>
            <div className={styles.infoSection}>
              <h2>Contact Information</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Email:</label>
                  <p>{plannerData.email}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Phone:</label>
                  <p>{plannerData.contactNumber}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>City:</label>
                  <p>{plannerData.city}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Address:</label>
                  <p>{plannerData.address}</p>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <h2>Professional Details</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Speciality:</label>
                  <p>{plannerData.speciality}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Budget Range:</label>
                  <p>LKR {parseInt(plannerData.budget).toLocaleString()}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Experience:</label>
                  <p>{plannerData.experience}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Gender:</label>
                  <p>{plannerData.gender}</p>
                  <button className={styles.b1} onClick={() => navigate('/')}>Log out</button>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      <Footer />
    </div>
  );
}
