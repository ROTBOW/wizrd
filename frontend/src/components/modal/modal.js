import React from 'react';
import SessionModalContainer from '../session/sessionModal/SessionModalContainer';
import EventFormContainer from '../events/EventForm/EventFormContainer';
import styles from './modal.module.scss';

const Modal = (props) => {

  let modal;
  let { name, ...otherProps } = props;

  switch (name) {
    case 'createEvent':
      modal = <EventFormContainer {...otherProps} name={name}/>;
      break;
    case 'sessionModal':
      modal = <SessionModalContainer {...otherProps} />;
      break;
    case 'editEvent':
      modal = <EventFormContainer {...otherProps} name={name}/>;
      break;
    default: 
      return;
  }

  return (
    <div className={styles.background} onClick={props.updateModal}>
      {modal}
    </div>
  )
}

export default Modal;