import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../SessionForm.module.scss';

const LoginFormContent = (props) => {
  const [usernameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    document.title = 'Wizrd - Log in';
    return () => document.title = 'Wizrd';
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { 
      usernameOrEmail,
      password
    };
    props.login(user) 
      .then((user) => {if (user && props.modal) {
          props.updateModal();
      }})
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
      <div className={styles.authSectionWrapper}>

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

  );
}

export default LoginFormContent;