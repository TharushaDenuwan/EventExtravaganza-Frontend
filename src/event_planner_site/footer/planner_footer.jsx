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
            <h3>EventPro</h3>
            <p>Making your special moments unforgettable with professional event planning services.</p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
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
                <span>contact@eventpro.com</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>123 Event Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 EventPro. All rights reserved.</p>
          <p className={styles.love}>
            Made with <Heart size={16} className={styles.heartIcon} /> by EventPro Team
          </p>
        </div>
      </div>
    </footer>
  );
}