import React from 'react';
import styles from './event_organizer_profile.module.css';
import Navigation from '../navigation/navigation';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';

export default function EventOrganizerProfile() {
  const navigate = useNavigate();
  // Retrieve organizer data from local storage
  const organizer = JSON.parse(localStorage.getItem('organizer')) || {
    name: "Udani Lokuhetti",
    city: "Colombo",
    email: "udanilokuhetti22@gmail.com",
    contactNumber: "+94(76) 0876 502",
  };

  return (
    <div>
      <Navigation />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImage}>
            <div className={styles.imagePlaceholder}>
              {organizer.name.charAt(0)}
            </div>
          </div>
          <h1 className={styles.name}>{organizer.name}</h1>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.infoSection}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>City</label>
                <p>{organizer.city}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Email</label>
                <p>{organizer.email}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Contact Number</label>
                <p>{organizer.contactNumber}</p>
                <button className={styles.b1} onClick={()=>navigate('/')}>Log out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}