import React from 'react';
import LoginFormContent from '../LoginForm/LoginFormContent';
import styles from './SessionModal.module.scss';

const SessionModal = (props) => {

  return (
    <div className={styles.formWrapper}>
      <LoginFormContent errors={props.errors} login={props.login} />
    </div>
  )
}

export default SessionModal;