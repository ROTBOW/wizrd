import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../SessionForm.module.scss';

const LoginFormContent = (props) => {
  const [usernameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginButton, setLoginButton] = useState("");

  useEffect(() => {
    setErrors({});
    document.title = 'Wizrd - Log in';
    return () => document.title = 'Wizrd';
  }, []);

  useEffect(() => {
    if (loginButton === 'clicked' && Object.values(props.errors).length === 0) {
      props.updateModal();
    }
  }, [loginButton, props.errors])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { 
      usernameOrEmail,
      password
    };
    props.login(user)
      .then(() => setLoginButton('clicked'));
  }
  
  const renderErrors = () => (
    <ul className={styles.errorsWrapper}>
      {Object.values(props.errors).map((error, i) => (
        <li key={`error-${i}`}>
          {error}
        </li>
      ))}
    </ul>
  );

  return (
      <div className={styles.authSectionWrapper} id="login-form">

        {renderErrors()}

        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Username or email:
              <input
                type="text"
                required
                spellCheck="false"
                value={usernameOrEmail}
                onChange={(e) => setUserNameOrEmail(e.target.value)}
                placeholder="Your username or email"
                id="email-input"
              />
            </label>

            <label>Password:
              <input
                type="password"
                required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                id="password-input"
              />
            </label>

            <div className={styles.spacer8}></div>

            <button type="submit" className={styles.button}>Sign in</button>
          </form>

        </div>
      </div>

  );
}

export default LoginFormContent;