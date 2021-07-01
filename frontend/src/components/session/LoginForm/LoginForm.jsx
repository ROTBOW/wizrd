import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';
import LoginFormContent from './LoginFormContent';

const LoginForm = (props) => {

  const loginDemo = (e) => {
    e.preventDefault();

    const demo = { usernameOrEmail: 'demo@mail.com', password: '123456' };
  
    const demoEmail = demo.usernameOrEmail.split('');
    const demoPassword = demo.password.split('');
    const time = 65;

    
      demoEmail.forEach((char, i) => {
        setTimeout(() => {
          let email = document.getElementById('email-input').value;
          email += char;
          document.getElementById('email-input').value = email;
        }, time * (i));
      })
    
    
      demoPassword.forEach((char, i) => {
          setTimeout(() => {
            let password = document.getElementById('password-input').value;
            password += char;
            document.getElementById('password-input').value = password;
          }, time * (i + demoEmail.length));
        }
      )
    
    setTimeout(()=> {
      props.login(demo)
    }, 1700);
    
    
  };
 
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
            <button type="submit" className={`${styles.button} ${styles.secondary}`} onClick={e => {e.preventDefault(); loginDemo(e); }}>Log in as demo user</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default withRouter(LoginForm);