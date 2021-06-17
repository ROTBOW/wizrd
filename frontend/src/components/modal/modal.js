import React from 'react';
import EventForm from '../events/EventForm/EventForm';
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
    <div>
      <div className={styles.background} onClick={props.updateModal}>
        {modal}
      </div>
    </div>
  )
}

export default Modal;