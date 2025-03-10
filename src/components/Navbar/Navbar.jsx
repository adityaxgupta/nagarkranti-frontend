import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  console.log('Navbar is rendering!');
  
  return (
    <nav className={styles.navbar}>
      <button onClick={goBack} className={styles.navButton}>
        &larr; Previous
      </button>
      <h1 className={styles.siteName}>NagarKranti</h1>
      <button onClick={goForward} className={styles.navButton}>
        Next &rarr;
      </button>
    </nav>
  );
}