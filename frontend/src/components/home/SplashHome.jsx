import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SplashHome.module.scss';
import hello from '../../assets/hello.svg';

const SplashHome = (props) => {

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.splash}>
        <h1 className={styles.title}>Welcome to Wizrd</h1>
        <p><Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link></p>

        <div className={styles.heroWrapper}>
          {/* <img className={styles.heroImage} src={hello} /> */}
          <img className={styles.heroImage} src="https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
        </div>
      </div>
    </div>
  );
}

export default SplashHome;
