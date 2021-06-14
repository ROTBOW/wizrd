import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
// import '../../index.scss';
import logo from '../../assets/logo.svg';

const Navbar = () => {

  return (
    <header className={styles.header}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles['logo-wrapper']}>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </Link>
          </div>

          <div className={styles['desktop-actions']}>
            <nav className={styles.nav}>
              <ul className={styles['nav-list']}>
                <li className={styles['nav-list-item']}>
                  <Link to="/login">Log in</Link>
                </li>
                <li className={styles['nav-list-item']}>
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>

              <div className={styles.divider}></div>

              <ul className={styles['nav-list']}>
                <li className={styles['nav-list-item']}>
                  <a href="https://github.com/ROTBOW/MERN-stack-project" target="_blank" rel="noreferrer">GitHub</a>
                </li>
              </ul>
            </nav>
          </div>
          
        </div>
      </div>
    </header>
  );
}


export default Navbar;