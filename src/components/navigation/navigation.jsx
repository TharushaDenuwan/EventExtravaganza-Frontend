
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Package, Send, MessageCircle, Inbox, User, ChevronDown } from 'lucide-react';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.nav}>
      <div className={styles.mainbox}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            Extravaganza
          </div>
          <button 
            className={styles.hamburger} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          <ul className={`${styles.navList} ${isOpen ? styles.open : ""}`}>
            <li onClick={() => navigate('/Home')} className={styles.navItem}>
              <Home size={18} />
              <span>Home</span>
            </li>
            <li 
              className={styles.navItem}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <div className={styles.servicesTrigger}>
                <Package size={18} />
                <span>Services</span>
                <ChevronDown size={16} className={`${styles.arrow} ${isServicesOpen ? styles.rotated : ''}`} />
              </div>
              <ul className={`${styles.dropdown} ${isServicesOpen ? styles.show : ''}`}>
                <li onClick={() => navigate('/Budget_Filtering')}>
                  <Package size={16} />
                  <span>Budget Filtering</span>
                </li>
                <li onClick={() => navigate('/LocationBase_Filtering')}>
                  <Package size={16} />
                  <span>Location Filtering</span>
                </li>
                <li onClick={() => navigate('/Invitation')}>
                  <Send size={16} />
                  <span>Send Invitations</span>
                </li>
                <li>
                  <MessageCircle size={16} />
                  <span>Chat Bot</span>
                </li>
              </ul>
            </li>
            <li className={styles.navItem}>
              <Inbox size={18} />
              <span>Inbox</span>
            </li>
            <li 
              className={styles.navItem} 
              onClick={() => navigate('/Organizer_Profile')}
            >
              <User size={18} />
              <span>Profile</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

