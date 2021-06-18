import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SplashHome.module.scss';
// import hello from '../../assets/hello.svg';

const SplashHome = (props) => {

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.splash}>
        <div className={styles.splashContent}>
          <h1 className={styles.title}>Welcome to <span className={styles.brandName}>Wizrd</span></h1>
          <p className={styles.messageIntro}>A magical place for the teacher in all of us.</p>
          <p className={styles.messageUnlock}>Unlock the door to a world of <span className={styles.smallBrandName}>Wizrdry</span>.</p>
            <Link to="/signup">
          <button className={styles.joinUs}>
              Join Us
            </button>
            </Link>
          
          {/* <p><Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link></p> */}
        </div>
      </div>
    </div>
  );
}

export default SplashHome;
