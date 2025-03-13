import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/GrievanceDetail.module.css";

const GrievanceDetail = () => {
  const navigate = useNavigate();

  const grievance = {
    id: 1,
    title: "Pothole on Main Road",
    description: "There is a deep pothole near the main crossing, causing accidents.",
    location: "Main Street, City Center",
    status: "Pending",
    reports: 5,
    image: "https://picsum.photos/200/300",
    images: [],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

      <div className={styles.content}>
        <h1 className={styles.title}>{grievance.title}</h1>
        
        <div className={styles.mainImageContainer}>
          <img 
            src={grievance.image} 
            alt={grievance.title} 
            className={styles.mainImage} 
          />
        </div>

        <div className={styles.details}>
          <p className={styles.description}>{grievance.description}</p>
          
          <div className={styles.metaData}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Location:</span>
              <span className={styles.metaValue}>{grievance.location}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Status:</span>
              <span className={styles.metaValue}>{grievance.status}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Reports:</span>
              <span className={styles.metaValue}>{grievance.reports}</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default GrievanceDetail;