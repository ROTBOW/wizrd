import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../home/Feed.module.scss';
import { BiUser, BiVideo } from "react-icons/bi";
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
      setResults(Object.values(props.events).sort(function(a, b) {
          const first = a['startTime'];
          const second = b['startTime'];
          return (first > second) ? 1 : (first < second) ? -1 : 0;
        }));
    }
  }, [props.events, props.errors])

  const auth = (eventId) => {
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

  const eventTime = (startTime) => {
    if (moment(startTime).isAfter(moment())) {
      return (
        <p className={styles.eventStartTime}>{moment(startTime).format("ddd, MMM D, LT")}</p>
      )
    } else {
      return (
        <p className={styles.eventStartTime}>Live Now</p>
      )
    }
  }

  return (
    <div>
      {modal}
      <main className={styles.feedWrapper}>

        <section className={styles.sectionWrapper}> 
          <h2 className={styles.categoryTitle}>Results</h2>
          <ul className={styles.eventsGridVertical}>
            {errors ? <li className={styles.errorItem}>{errors}</li> :
            results ? results.map((e, i) => {
              return (
                <div className={`${styles.noUnderline} ${styles.eventCard}`} key={i} onClick={() => auth(e._id)}>
                  <li>
                    <h3 className={styles.eventTitle}>{e.title}</h3>
                    <p className={styles.eventTopic}>{e.topic}</p>
                    <div className={styles.cardRowWrapper}>
                      <BiUser className={styles.cardIcon}/>
                      <p className={styles.eventHost}>{e.hostUsername}</p>
                    </div>
                    <div className={styles.cardRowWrapper}>
                      <BiVideo className={styles.cardIcon}/>
                      {eventTime(e.startTime)}
                    </div>
                    {e.description ? <p className={styles.eventDescription}>{e.description}</p> : ''}
                  </li>
                </div>
              );
            }) : ''
          }
          </ul>
        </section>
      </main>
    </div>

  );
}

export default SearchResults;