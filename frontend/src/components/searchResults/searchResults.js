import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../home/HomeFeed.module.scss';
import { BiUser, BiBulb, BiVideo } from "react-icons/bi";
import moment from 'moment';

const SearchResults = (props) => {
  const [results, setResults] = useState(props.events);
  
  return (
    <section className={styles.sectionWrapper}> 
          <h2 className={styles.categoryTitle}>Currently Streaming Events</h2>
          <ul className={styles.eventsGrid}>
            {results ? results.map((e, i) => {
              return <li key={i} className={styles.eventCard}>
                  <Link to={`/event/${e._id}`} className={styles.noUnderline}>
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
            }) : ''}
          </ul>
        </section>
  );
}

export default SearchResults;