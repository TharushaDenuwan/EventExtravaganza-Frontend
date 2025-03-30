import React from 'react';
import styles from './templates.module.css';

export default function Template1({ eventDetails }) {
  return (
    <div className={styles.template1}>
      <div className={styles.templateInner}>
        <div className={styles.decorativeHeader}></div>
        <h2 className={styles.title}>You're Cordially Invited</h2>
        <h3 className={styles.eventName}>{eventDetails.eventName}</h3>
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
        <p className={styles.footer}>We look forward to celebrating with you!</p>
        <div className={styles.decorativeFooter}></div>
      </div>
    </div>
  );
}