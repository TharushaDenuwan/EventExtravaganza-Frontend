import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./event_planner_profile.module.css";
import Navigation from "../../event_planner_site/navigation/navigation";
import Footer from "../../event_planner_site/footer/planner_footer";

export default function EventPlannerProfile() {
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  const plannerData = JSON.parse(localStorage.getItem("planner")) || {
    name: "Udani Lokuhetti",
    city: "Colombo",
    email: "udanilokuhetti24@gmail.com",
    contactNumber: "+94(76) 0876 502",
    gender: "Female",
    address: "123 Event Street, Colombo 07",
    speciality: "Wedding",
    budget: "200000",
  };

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/checklists/planner/${plannerData.name}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch checklists");
        }
        const checklistsData = await response.json();
        setChecklists(checklistsData);
      } catch (error) {
        console.error("Error fetching checklists:", error);
        setChecklists([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChecklists();
  }, [plannerData.name]);

  const updateTaskStatus = async (checklistId, taskIndex, newStatus) => {
    try {
      const updatedChecklists = checklists.map((checklist) => {
        if (checklist._id === checklistId) {
          checklist.tasks[taskIndex].status = newStatus;
        }
        return checklist;
      });

      setChecklists(updatedChecklists);

      await fetch(`http://localhost:5000/api/checklists/update-task-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checklistId, taskIndex, newStatus }),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImageContainer}>
              {/* <img
                src={plannerData.profilePicture || "/placeholder.svg"}
                alt={plannerData.name}
                className={styles.profileImage}
              /> */}
              {plannerData.name.charAt(0)}
            </div>
            <h1 className={styles.profileName}>{plannerData.name}</h1>

            <Link to="/Checklist" className={styles.checklistButton}>
              Go to Checklist
            </Link>
          </div>

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
          </div>

          {selectedChecklist && (
            <div
              className={styles.popupOverlay}
              onClick={() => setSelectedChecklist(null)}
            >
              <div
                className={styles.popupContent}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>{selectedChecklist.checklistName}</h2>
                <p>
                  <strong>Organizer:</strong> {selectedChecklist.organizerName}
                </p>

                <h3>Task Details:</h3>
                {selectedChecklist.tasks && selectedChecklist.tasks.length > 0 ? (
                  <table className={styles.taskTable}>
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedChecklist.tasks.map((task, idx) => (
                        <tr key={idx}>
                          <td>{task.name}</td>
                          <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                          <td>{task.priority}</td>
                          <td>
                            <select
                              value={task.status}
                              onChange={(e) =>
                                updateTaskStatus(selectedChecklist._id, idx, e.target.value)
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No tasks available.</p>
                )}

                <button
                  className={styles.closeButton}
                  onClick={() => setSelectedChecklist(null)}
                >
                  Close
                </button>
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
                  <label>Gender:</label>
                  <p>{plannerData.gender}</p>
                  <button
                    className={styles.b1}
                    onClick={() => navigate("/")}
                  >
                    Log out
                  </button>
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
