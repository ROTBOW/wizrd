import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';
import SignupFormContent from './SignupFormContent';

const SignupForm = (props) => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");
  // const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   setErrors({});
  //   document.title = 'Wizrd - Log in';
  //   return () => {
  //     document.title = 'Wizrd';
  //   }
  // }, [])

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let user = {
  //     email,
  //     username,
  //     password,
  //     password2
  //   };
  //   props.signup(user, props.history)
  //     .then((user) => props.login(user))
  //     // .then((res) => props.history.push('/'));
  // };

  // const renderErrors = () => (
  //   <ul className={styles.errorsWrapper}>
  //     {Object.values(props.errors).map((error, i) => (
  //       <li key={`error-${i}`}>
  //         {error}
  //       </li>
  //     ))}
  //   </ul>
  // );



  return (
    <div className={styles.pageWrapper}>
      <SignupFormContent errors={props.errors} signup={props.signup} login={props.login}/>
      {/* <section className={styles.authSectionWrapper}>
        <h1>Sign up</h1>
        
        {renderErrors()}

        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.avatarWrapper}>
              <label>
                <input
                  type="radio"
                  value="0"
                  checked={avatar === '0'}
                  onChange={onValueChange}
                  className={styles.hideMe}
                />
                  <img src={avatars[0]} className={`${styles.avatarIcon} ${checkIfSelected(0)}`}/>
              </label>
              
              <label>
                <input
                  type="radio"
                  value="1"
                  checked={avatar === '1'}
                  onChange={onValueChange}
                  className={styles.hideMe}
                />
                <img src={avatars[1]} className={`${styles.avatarIcon} ${checkIfSelected(1)}`}/>
              </label>

              <label>
                <input
                  type="radio"
                  value="2"
                  checked={avatar === '2'}
                  onChange={onValueChange}
                  className={styles.hideMe}
                />
                <img src={avatars[2]} className={`${styles.avatarIcon} ${checkIfSelected(2)}`}/>
              </label>
            </div>

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
      </section> */}

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
};


export default withRouter(SignupForm);
