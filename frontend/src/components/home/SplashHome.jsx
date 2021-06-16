import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SplashHome.module.scss';

const SplashHome = (props) => {

  return (
    <div style={{'maxWidth': '1024px', 'margin': '0 auto', 'padding': '32px 32px'}}>
        <h2 className={styles.title}>Welcome to this site</h2>
        <p><Link to="/login">Login</Link></p>
        <p><Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default SplashHome;
