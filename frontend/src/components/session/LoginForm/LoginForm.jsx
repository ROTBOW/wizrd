import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';

const LoginForm = (props) => {
  const [usernameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    document.title = 'Wizrd - Log in';
    return () => document.title = 'Wizrd';
  }, []);

  const renderErrors = () => (
    <ul className={styles.errorsWrapper}>
      {Object.values(props.errors).map((error, i) => (
        <li key={`error-${i}`}>
          {error}
        </li>
      ))}
    </ul>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { 
      usernameOrEmail,
      password
    };
    props.login(user); 
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authSectionWrapper}>
        <h1>Log in</h1>

        {renderErrors()}

        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Username or email:
              <input type="text" required spellCheck="false" value={usernameOrEmail} onChange={(e) => setUserNameOrEmail(e.target.value)} placeholder="Your username or email" />
            </label>

            <label>Password:
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </label>

            <div className={styles.spacer8}></div>

            <button type="submit" className={styles.button}>Sign in</button>
          </form>

          <p className={styles.authParagraph}>New to Wizrd? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>

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