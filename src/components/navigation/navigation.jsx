import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Access current route location

  // Function to check if the current path matches
  const isActive = (path) => location.pathname === path ? styles.active : "";

  return (
    <div className={styles.nav}>
      <div className={styles.mainbox}>
        <nav className={styles.navbar}>
          <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          <ul className={`${styles.navList} ${isOpen ? styles.open : ""}`}>
            <li onClick={() => navigate('/Home')} className={`${styles.li1} ${isActive('/Home')}`}>Home</li>
            <li className={styles.list2}>
              Services
              <div className={styles.dropdown}>
                <li onClick={() => navigate('/budget_filtering')} className={isActive('/budget_filtering')}>Budget Filtering</li>
                <li onClick={() => navigate('/LocationBase_Filtering')} className={isActive('/LocationBase_Filtering')}>Location Filtering</li>
                <li onClick={() => navigate('/Invitation')} className={isActive('/Invitation')}>Send Invitations</li>
                <li className={isActive('/ChatBot')}>Chat Bot</li>
              </div>
            </li>
            <li className={`${styles.li1} ${isActive('/Inbox')}`} onClick={() => navigate('/Inbox')}>Inbox</li>
            <li className={`${styles.li1} ${isActive('/Organizer_Profile')}`} onClick={() => navigate('/Organizer_Profile')}>Profile</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
