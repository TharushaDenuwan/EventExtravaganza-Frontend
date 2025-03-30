import { Star } from "lucide-react"
import styles from "./ratings.module.css"

export default function RatingDisplay({ ratings }) {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.ratingSection}>
        <h2 className={styles.title}>Reviews</h2>
      </div>
      
      <div className={styles.reviewsWrapper}>
        {ratings.map((rating) => (
          <div key={rating.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.starContainer}>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className={`${styles.star} ${index < rating.rating ? styles.active : ""}`} />
                ))}
              </div>
              <span className={styles.reviewDate}>{new Date(rating.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles.reviewAuthor}>
              <span>{rating.organizerName}</span>
            </div>
            <p className={styles.reviewText}>{rating.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}



