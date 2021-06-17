import React from 'react';
import LoginFormContent from '../LoginForm/LoginFormContent';
import styles from './SessionModal.module.scss';

const SessionModal = (props) => {

  return (
    <div className={styles.formWrapper} onClick={(e) => e.stopPropagation()}>
      <p className={styles.header}>Please Log In or Sign Up to gain access to all of Wizrd's features!</p>
      <LoginFormContent errors={props.errors} login={props.login} modal={true} updateModal={props.updateModal}/>
    </div>
  )
}

export default SessionModal;