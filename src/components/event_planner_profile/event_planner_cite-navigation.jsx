import React from "react";
import { Link,useNavigate } from "react-router-dom";
import styles from "../navigation/navigation.module.css";

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <div>
        <div className={styles.mainbox}>
            <nav className={styles.navbar}>
                <ul className={styles.navList}>
                    <li className={styles.li1} onClick={()=>navigate('/Home_PAGE')}> Home</li>
                    <li className={styles.list2}>
                      Services
                      <div className={styles.dropdown}>
                        <li onClick={()=>navigate('/Packages')}>Packages</li>
                        <li onClick={()=>navigate('/Checklist')}>Checklist</li>
                        <li>Chat Bot</li>
                      </div>
                    </li>
                    
                    <li className={styles.li1}>Inbox</li>
                    <li className={styles.li1} onClick={()=>navigate('/Planner_Profile')}>Profile</li>
                </ul>
            </nav>
        </div>
    </div>
  );
}
