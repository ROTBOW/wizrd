import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';

const Navbar = (props) => {
  // console.log('props', props);

  // const greeting = () => {
  //   if (loggedIn) {
  //     return <div></div>
  //   } else {
  //     return <div></div>
  //   }
  // };

  return (
    <header className={styles.header}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.logoWrapper}>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </Link>
          </div>

          <div className={styles.navWrapper}>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navLink}>
                  <Link to="/login">Log in</Link>
                </li>
                <li className={styles.navLink}>
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>

              <div className={styles.divider}></div>

              <ul className={styles.navList}>
                <li className={styles.navLink}>
                  <a href="https://github.com/ROTBOW/MERN-stack-project" target="_blank" rel="noreferrer">GitHub</a>
                </li>
              </ul>
            </nav>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
