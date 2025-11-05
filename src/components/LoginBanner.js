import React from 'react';
import styles from '../styles/Banner.module.css';

const LoginBanner = () => {
  return (
    <div className={`col-md-6 d-flex align-items-center justify-content-center text-white ${styles.banner}`}>
      <div className={styles.overlay}></div>
      <div className="text-center position-relative">
        <h1>Bienvenido a Unsito</h1>
        <p>Tu plataforma para gestionar todo.</p>
      </div>
    </div>
  );
};

export default LoginBanner;
