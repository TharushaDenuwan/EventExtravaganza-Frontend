import React from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';
import styles from './planner_footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Event Extravaganza</h3>
            <p>Making your special moments unforgettable with professional event planning services.</p>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/event_extravaganza/?igsh=cmRuOXpxaXZyMHM4#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/eventextravaganza/" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => navigate('/Home_PAGE')}>Home</button></li>
              <li><button onClick={() => navigate('/Packages')}>Packages</button></li>
              <li><button onClick={() => navigate('/Checklist')}>Checklist</button></li>
              <li><button>Chat Bot</button></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Contact Info</h4>
            <ul className={styles.contactInfo}>
              <li>
                <Mail size={16} />
                <span>extravaganzaevent14@gmail.com</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2025 Event Extravaganza. All rights reserved.</p>
          <p className={styles.love}>
            Made with <Heart size={16} className={styles.heartIcon} /> by Event Extravaganza Team
          </p>
        </div>
      </div>
    </footer>
  );
}