import React from 'react';
import EventForm from '../events/EventForm/EventFormClass';
import styles from './modal.module.scss';

const Modal = (props) => {

  let modal;
  let { name, ...otherProps } = props;

  switch (name) {
    case 'createEvent':
      modal = <EventForm {...otherProps} />;
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