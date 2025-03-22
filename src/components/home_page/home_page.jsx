import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './home_page.module.css';
import { Calendar, Users } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add(styles.loaded);
    return () => document.body.classList.remove(styles.loaded);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.gradientOverlay}></div>
      
      <div className={styles.animatedBg}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>WELCOME TO</span>
          <span className={styles.titleHighlight}>EXTRAVAGANZA</span>
        </h1>
        
        <div className={styles.buttonContainer}>
          <div className={styles.buttonWrapper}>
            <button 
              className={styles.actionButton} 
              onClick={() => navigate("/organizer_login")}
            >
              <Users className={styles.buttonIcon} />
              <span>Event Organizer</span>
            </button>
            <p className={styles.buttonDescription}>Create and manage your events</p>
          </div>

          <div className={styles.buttonWrapper}>
            <button 
              className={styles.actionButton} 
              onClick={() => navigate("/planner_login")}
            >
              <Calendar className={styles.buttonIcon} />
              <span>Event Planner</span>
            </button>
            <p className={styles.buttonDescription}>Showcase your planning services</p>
          </div>
        </div>

        <div className={styles.descriptionBox}>
          <p className={styles.description}>
            At Event Extravaganza, we are dedicated to providing a seamless platform for event organizers 
            and planners to connect, collaborate, and create exceptional experiences. Our goal is to 
            simplify the event planning process by bringing together industry professionals, resources, 
            and opportunities in one place. Whether you're a seasoned event planner or just starting out, 
            our platform helps you discover new connections, and elevate your event management skills.
          </p>
        </div>
      </main>
    </div>
  );
}