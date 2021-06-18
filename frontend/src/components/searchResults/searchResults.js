import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../home/HomeFeed.module.scss';
import { BiUser, BiBulb, BiVideo } from "react-icons/bi";
import moment from 'moment';
import Modal from '../modal/modal';

const SearchResults = (props) => {
  const [results, setResults] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(props.errors).length > 0) {
      setErrors(props.errors.noEventsFound);
      setResults([]);
    } else {
      setErrors('');
      setResults(Object.values(props.events));
    }
  }, [props.events, props.errors])

  const auth = (eventId) => {
    // console.log('auth');
    // e.preventDefault();
    if (!props.isLoggedIn) {
      props.updateModal('sessionModal');
    } else {
      history.push(`/events/${eventId}`);
    }
  }

  let modal;
  props.modal ? 
    modal = <Modal name="sessionModal" updateModal={props.updateModal}/>
  : modal = '';

  return (
    <div>
      {modal}
      <section className={styles.sectionWrapper}> 
        <h2 className={styles.categoryTitle}>Results</h2>
        <ul className={styles.eventsGrid}>
          {errors ? <li className={styles.errorItem}>{errors}</li> :
          results ? results.map((e, i) => {
            return <a className={`${styles.noUnderline} ${styles.eventCard}`} key={i} onClick={() => auth(e._id)}>
              <li>
                <h3 className={styles.eventTitle}>{e.title}</h3>
                <div className={styles.cardRowWrapper}>
                  <BiBulb className={styles.cardIcon}/>
                  <p className={styles.eventTopic}>{e.topic}</p>
                </div>
                <div className={styles.cardRowWrapper}>
                  <BiVideo className={styles.cardIcon}/>
                  <p className={styles.eventStartTime}>
                    {moment(e.startTime).format("ddd, MMM D, LT")}
                  </p>
                </div>
                
                {e.description ? <p className={styles.eventDescription}>{e.description}</p> : ''}
              </li>
            </a>
          }) : ''
        }
        </ul>
      </section>
    </div>

  );
}

export default SearchResults;