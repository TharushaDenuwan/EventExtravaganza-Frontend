import React from 'react'
import styles from '../home_page/home_page.module.css'
import Navigation from '../navigation/navigation'
import Footer from '../footer/planner_footer'

export default function home_page() {
  return (
    <div>
        <div className={styles.main1}>
            {<Navigation/>}
            <div className={styles.box1}> 
                <p className={styles.p1}>Your Projects</p>
                <p className={styles.p2}>Here are your projects you currently working on</p>
                <div className={styles.box2}>
                    <div className={styles.box3}>
                        <p className={styles.p3}>Current Projects</p>
                        <hr style={{ border: "1px solid #0073e5" }} />
                    </div>
                    <div className={styles.box3}>
                        <p className={styles.p3}>Project History</p>
                        <hr style={{ border: "1px solid #0073e5" }} />
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}
