import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';
import LoginFormContent from './LoginFormContent';

const LoginForm = (props) => {
 
  return (
    <div className={styles.pageWrapper}>
      <h1>Log in</h1>
      <LoginFormContent errors={props.errors} login={props.login}/>

      <p className={styles.authParagraph}>New to Wizrd? <Link to="/signup">Sign up</Link></p>
      <div className={styles.authSectionDivider}></div>

      <section className={styles.authSectionWrapper}>
        <div className={styles.authHeaderWrapper}>
          <h2 className={styles.authSubtitle}>Want to try Wizrd without making an account?</h2>
          <p className={styles.authParagraph}>You can log in as one of our demo users.</p>
        </div>
        <div className={styles.formWrapper}>
          <form onSubmit={props.loginDemo} className={styles.form}>
            <button type="submit" className={`${styles.button} ${styles.secondary}`}>Log in as demo user</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default withRouter(LoginForm);