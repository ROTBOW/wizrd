import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../SessionForm.module.scss';

const SignupFormContent = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    document.title = 'Wizrd - Log in';
    return () => {
      document.title = 'Wizrd';
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email,
      username,
      password,
      password2
    };
    props.signup(user, props.history)
      .then((user) => {
        if (!!user) props.login({
          usernameOrEmail: user.userData.data.usernameOrEmail,
          password: user.userData.data.password
        })
      })
  };

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
      <section className={styles.authSectionWrapper}>
        <h1>Sign up</h1>
        
        {renderErrors()}

        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Username:
              <input type="text" required spellCheck="false" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your username" />
            </label>

            <label>Email:
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
            </label>

            <label>Password:
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </label>

            <label>Confirm your password:
              <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Your password" />
            </label>

            <div className={styles.spacer8}></div>

            <button type="submit" className={styles.button}>Create a new account</button>
          </form>

          <p className={styles.authParagraph}>Already have an account? <Link className={styles.authParagraph} to="/login">Log in</Link></p>
        </div>
      </section>
  );
}

export default SignupFormContent;