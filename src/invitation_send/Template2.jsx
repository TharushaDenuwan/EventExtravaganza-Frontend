import React from 'react';
import styles from './templates.module.css';

export default function Template2({ eventDetails }) {
  return (
    <div className={styles.template2}>
      <div className={styles.templateInner}>
        <div className={styles.circle}></div>
        <h2 className={styles.title}>Join Us For</h2>
        <h3 className={styles.eventName}>{eventDetails.eventName}</h3>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>When</span>
            <span className={styles.value}>
              {eventDetails.eventDate} at {eventDetails.eventTime}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Where</span>
            <span className={styles.value}>{eventDetails.eventLocation}</span>
          </div>
        </div>
        <p className={styles.footer}>We are excited to have you join us for this special event!</p>
      </div>
    </div>
  );
}