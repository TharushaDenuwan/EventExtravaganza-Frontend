import React from 'react';
import styles from './templates.module.css';

export default function Template3({ eventDetails }) {
  return (
    <div className={styles.template3}>
      <div className={styles.templateInner}>
        <div className={styles.border}>
          <h2 className={styles.title}>{eventDetails.eventName}</h2>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Date</span>
              <span className={styles.value}>{eventDetails.eventDate}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Time</span>
              <span className={styles.value}>{eventDetails.eventTime}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Location</span>
              <span className={styles.value}>{eventDetails.eventLocation}</span>
            </div>
          </div>
          <p className={styles.footer}>We would be honored to have you celebrate with us.</p>
        </div>
      </div>
    </div>
  );
}