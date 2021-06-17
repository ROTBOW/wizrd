import React, { useState } from 'react';
import LoginFormContent from '../LoginForm/LoginFormContent';
import SignupFormContent from '../SignupForm/SignupFormContent';
import styles from './SessionModal.module.scss';

const SessionModal = (props) => {
  const [view, setView] = useState('login');

  return (
    <div className={styles.formWrapper} onClick={(e) => e.stopPropagation()}>
      <p className={styles.header}>Please Log In or Sign Up to gain access to all of Wizrd's features!</p>
      {view === 'login' ? 
      <div>
        <LoginFormContent errors={props.errors} login={props.login} modal={true} updateModal={props.updateModal}/>
        <p className={styles.authParagraph}>New to Wizrd? <a onClick={() => setView('signup')}>Sign up</a></p>
      </div>
      : 
      <div>
        <SignupFormContent errors={props.errors} login={props.login} signup={props.signup} modal={true} updateModal={props.updateModal}/>
        <p className={styles.authParagraph}>Already have an account? <a onClick={() => setView('login')}>Log in</a></p>  
      </div>}
    </div>
  )
}

export default SessionModal;