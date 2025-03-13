import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/pages/GrievanceDetail.module.css";
import pothole from "../../assets/pothole.jpg";
import sewage from "../../assets/sewage.avif";
import streetlight from "../../assets/streetlight.jpg";

const grievances = [
  {
    id: 1,
    title: "Pothole on Main Road",
    description: "There is a deep pothole on the main road, causing accidents.",
    location: "Lat: 28.6319, Lng: 77.2263",
    status: "Pending",
    reports: 5,
    image: pothole,
  },
  {
    id: 2,
    title: "Sewage Overflow",
    description: "Sewage water is overflowing on the streets, creating a foul smell.",
    location: "Lat: 28.6357, Lng: 77.2244",
    status: "In Progress",
    reports: 3,
    image: sewage,
  },
  {
    id: 3,
    title: "Streetlight Not Working",
    description: "A major streetlight is not functioning, making the road unsafe at night.",
    location: "Lat: 28.6402, Lng: 77.2301",
    status: "Resolved",
    reports: 7,
    image: streetlight,
  },
];

const GrievanceDetail = () => {
  const { id } = useParams(); // Extract the `id` from the URL
  const navigate = useNavigate();

  // Find the grievance with the matching `id`
  const grievance = grievances.find((g) => g.id === Number(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If no grievance is found, show an error message

  return (
    <div className={styles.content}>
      <div className={styles.grievanceCard}>
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
    </div>
  );
};

export default GrievanceDetail;