import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Welcome.module.css';

export default function Welcome() {
  const navigate = useNavigate();

  const handlePublicUser = () => {
    navigate('/public/auth'); // Redirect to public auth page
  };

  const handleMunicipalUser = () => {
    navigate('/municipal/auth'); // Redirect to municipal auth page
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.overlay}>
        <div className={styles.buttonContainer}>
          <button className={styles.publicButton} onClick={handlePublicUser}>
            <span className={styles.emoji}>👤</span>
            <span className={styles.title}>Public User</span>
            <span className={styles.description}>
              Report and track grievances in your locality.
            </span>
          </button>
          <button className={styles.municipalButton} onClick={handleMunicipalUser}>
            <span className={styles.emoji}>🏢</span>
            <span className={styles.title}>Municipal User</span>
            <span className={styles.description}>
              Verify and resolve grievances in your area.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}