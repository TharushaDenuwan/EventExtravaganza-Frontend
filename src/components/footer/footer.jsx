

import React from 'react';
import { Instagram, Linkedin, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import styles from './footer.module.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>About Us</h3>
          <p>Extravaganza helps you create unforgettable events with professional planning services and seamless coordination.</p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} />
              <span>contact@extravaganza.com</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} />
              <span>123 Event Street, Planning City</span>
            </div>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <div className={styles.quickLinks}>
            <div className={styles.linksColumn}>
              <a href="/Home">Home</a>
              <a href="/Budget_Filtering">Budget Filtering</a>
              <a href="/LocationBase_Filtering">Search Venues</a>
            </div>
            <div className={styles.linksColumn}>
              <a href="#chatbot">Chatbot</a>
              <a href="/Invitation">Invitation Management</a>
              {/* <a href="#checklist-management">Checklist Management</a> */}
            </div>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3>Connect With Us</h3>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <Instagram />
            </a>
            <a 
              href="https://www.linkedin.com/company/eventextravaganza/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
            <a href="#" className={styles.socialLink} aria-label="WhatsApp">
              <MessageCircle />
            </a>
          </div>
          <div className={styles.newsletter}>
            <h4>Subscribe to Our Newsletter</h4>
            <div className={styles.subscribeForm}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p>&copy; 2025 Extravaganza. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>

    </footer>
  );
}