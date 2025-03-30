"use client"

import { useState } from "react"
import RatingForm from "./rating_form"
import RatingDisplay from "./rating_display"
import styles from "./ratings.module.css"

export default function RatingSystem() {
  const [ratings, setRatings] = useState([
    {
      id: "1",
      rating: 5,
      comment:
        "Excellent attention to detail and great communication throughout the event planning process. The wedding was perfectly organized!",
      organizerName: "John Doe",
      createdAt: "2024-02-12T10:00:00Z",
    },
    {
      id: "2",
      rating: 4,
      comment:
        "Very professional and responsive. The corporate event was well-executed, though there were minor timing issues.",
      organizerName: "Pasan De Silva",
      createdAt: "2024-02-10T15:30:00Z",
    },
    {
      id: "3",
      rating: 4,
      comment:
        "Outstanding service! The birthday party exceeded our expectations. Every detail was perfect, from decorations to catering.",
      organizerName: "Sara Kalpani",
      createdAt: "2024-02-08T09:15:00Z",
    },
  ])

  const handleSubmitRating = (rating, comment) => {
    const newRating = {
      id: Date.now().toString(),
      rating,
      comment,
      organizerName: "Current User",
      createdAt: new Date().toISOString(),
    }

    setRatings((prevRatings) => [newRating, ...prevRatings])
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.mainTitle}>Rate Event Planner</h1>
        <RatingForm onSubmit={handleSubmitRating} />
        <RatingDisplay ratings={ratings} />
      </div>
    </div>
  )
}

