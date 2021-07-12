import React, { useState } from 'react';
import LoginFormContent from '../LoginForm/LoginFormContent';
import SignupFormContent from '../SignupForm/SignupFormContent';
import styles from './SessionModal.module.scss';

const SessionModal = (props) => {
  const [view, setView] = useState('login');

  return (
    <div className={styles.formWrapper} onClick={(e) => e.stopPropagation()}>
      <p className={styles.header}>Please log in or sign up to gain access to all of Wizrd's features!</p>
      {view === 'login' ? 
      <div>
        <LoginFormContent errors={props.errors} login={props.login} modal={true} updateModal={props.updateModal}/>
        <p className={styles.authParagraph}>New to Wizrd? <span className={styles.link} onClick={() => setView('signup')}>Sign up</span></p>
      </div>
      : 
      <div>
        <SignupFormContent errors={props.errors} login={props.login} signup={props.signup} modal={true} updateModal={props.updateModal}/>
        <p className={styles.authParagraph}>Already have an account? <span className={styles.link} onClick={() => setView('login')}>Log in</span></p>  
      </div>}
    </div>
  )
}

export default SessionModal;