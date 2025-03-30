import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Package, CheckSquare, MessageCircle, Inbox, User, ChevronDown } from 'lucide-react';
import styles from "./navigation.module.css";

export default function Navigation() {
  const navigate = useNavigate();
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            Extravaganza
          </div>
          
          <ul className={styles.navList}>
            <li>
              <button 
                className={styles.navLink} 
                onClick={() => navigate('/Home_PAGE')}
              >
                <Home size={18} />
                <span>Home</span>
              </button>
            </li>
            
            <li 
              className={styles.servicesDropdown}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={`${styles.navLink} ${isServicesOpen ? styles.active : ''}`}>
                <Package size={18} />
                <span>Services</span>
                <ChevronDown size={16} className={`${styles.arrow} ${isServicesOpen ? styles.rotated : ''}`} />
              </button>
              
              <div className={`${styles.dropdown} ${isServicesOpen ? styles.show : ''}`}>
                <button onClick={() => navigate('/Packages')} className={styles.dropdownItem}>
                  <Package size={16} />
                  <span>Packages</span>
                </button>
                <button onClick={() => navigate('/Checklist')} className={styles.dropdownItem}>
                  <CheckSquare size={16} />
                  <span>Checklist</span>
                </button>
                <button className={styles.dropdownItem}>
                  <MessageCircle size={16} />
                  <span>Chat Bot</span>
                </button>
              </div>
            </li>
            
            <li>
              <button className={styles.navLink}>
                <Inbox size={18} />
                <span>Inbox</span>
              </button>
            </li>
            
            <li>
              <button 
                className={styles.navLink} 
                onClick={() => navigate('/Planner_Profile')}
              >
                <User size={18} />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}