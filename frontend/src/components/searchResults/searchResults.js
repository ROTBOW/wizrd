import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../home/HomeFeed.module.scss';
import { BiUser, BiBulb, BiVideo } from "react-icons/bi";
import moment from 'moment';

const SearchResults = (props) => {
  const [results, setResults] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (Object.keys(props.errors).length > 0) {
      setErrors(props.errors.noEventsFound);
      setResults([]);
    } else {
      let events = [];
      for (let key in props.events) {
        events.push(props.events[key])
      }
      setErrors('');
      setResults(events);
    }
  }, [props.events, props.errors])

  return (

    <section className={styles.sectionWrapper}> 
      <h2 className={styles.categoryTitle}>Results</h2>
      <ul className={styles.eventsGrid}>
        {errors ? <li className={styles.errorItem}>{errors}</li> :
        results ? results.map((e, i) => {
          return <li key={i} className={styles.eventCard}>
            <Link to={`/events/${e._id}`} className={styles.noUnderline}>
              <h3 className={styles.eventTitle}>{e.title}</h3>
            </Link>
            <div className={styles.cardRowWrapper}>
              <BiBulb className={styles.cardIcon}/>
              <p className={styles.eventTopic}>{e.topic}</p>
            </div>
            <div className={styles.cardRowWrapper}>
              <BiVideo className={styles.cardIcon}/>
              <p className={styles.eventStartTime}>{moment(e.startTime).format("ddd, MMM D, LT")}</p>
            </div>
            {e.description ? <p className={styles.eventDescription}>{e.description}</p> : ''}
          </li>
          }) : ''
        }
        </ul>
      </section>

  );
}

export default SearchResults;