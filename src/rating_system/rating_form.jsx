"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import styles from "./ratings.module.css"

export default function RatingForm({ onSubmit }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating || !comment.trim()) return
    onSubmit(rating, comment)
    setRating(0)
    setComment("")
  }

  return (
    <div className={styles.container}>
      <div className={styles.ratingSection}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h2 className={styles.title}>Rate Your Event Planner</h2>
          </div>

          <div className={styles.formContent}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={styles.starButton}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star className={`${styles.star} ${star <= (hoveredRating || rating) ? styles.active : ""}`} />
                </button>
              ))}
            </div>

            <div className={styles.textareaWrapper}>
              <textarea
                placeholder="Share your experience with this event planner..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={styles.textarea}
              />
            </div>
          </div>
          
          <div className={styles.formFooter}>
            <button type="submit" disabled={!rating || !comment.trim()} className={styles.submitButton}>
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

