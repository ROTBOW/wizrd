import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';
import SignupFormContent from './SignupFormContent';

const SignupForm = (props) => {

  const logMeIn = (e) => {
      e.preventDefault();
      props.login({
        usernameOrEmail: 'demo@mail.com',
        password: '123456'
      });
  }
  
  return (
    <div className={styles.pageWrapper}>
      <h1>Sign up</h1>

      <SignupFormContent errors={props.errors} signup={props.signup} login={props.login}/>

      <p className={styles.authParagraph}>Already have an account? <Link className={styles.authParagraph} to="/login">Log in</Link></p>

      <div className={styles.authSectionDivider}></div>

      <section className={styles.authSectionWrapper}>
        <div className={styles.authHeaderWrapper}>
          <h2 className={styles.authSubtitle}>Want to try Wizrd without making an account?</h2>
          <p className={styles.authParagraph}>You can log in as one of our demo users.</p>
        </div>
        <div className={styles.formWrapper}>
          <form onSubmit={props.loginDemo} className={styles.form}>
            <button type="submit" className={`${styles.button} ${styles.secondary}`} onClick={logMeIn}>Log in as demo user</button>
          </form>
        </div>
      </section>
    </div>
  );
};


export default withRouter(SignupForm);
