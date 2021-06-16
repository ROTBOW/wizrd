import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './HomeFeed.module.scss';
import { fetchLiveEvents, fetchFutureEvents } from '../../util/eventUtil';
import EventForm from '../events/EventForm/EventForm';
import { updateModal } from '../../actions/uiActions';
import moment from 'moment';
import { BiUser, BiVideo } from "react-icons/bi";

const HomeFeed = (props) => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);

  useEffect(() => {
    props.fetchLiveEvents()
      .then(events => {
        setLiveEvents(events.data)
      });
    props.fetchFutureEvents()
      .then(events => {
        setFutureEvents(events.data)
      })
  }, [])

  const formatDate = (date) => {
    return;
  }

  return (
    <div>
      {props.modal === 'createEvent' ? <EventForm /> : ''}

      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Welcome to Wizrd, @{props.user.username}</h1>
          <p className={styles.headerSubtitle}>
            Wizard is a streaming platform for the teacher inside all of us. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione beatae tenetur veritatis. Join an event, or create your own.
          </p>
          <button className={styles.createEventButton} onClick={props.updateModal('createEvent')}>Create an event</button>
        </div>
      </div>

      <main className={styles.feedWrapper}>

        <section className={styles.sectionWrapper}> 
          <h2 className={styles.categoryTitle}>Currently Streaming Events</h2>
          <ul className={styles.eventsGrid}>
            {liveEvents ? liveEvents.map((e, i) => (
              <Link to={`/event/${e._id}`} className={`${styles.eventCard} ${styles.noUnderline}`}>
                <li key={i}>
                  <h3 className={styles.eventTitle}>{e.title}</h3>
                  <p className={styles.eventTopic}>{e.topic}</p>
                  <div className={styles.cardRowWrapper}>
                    <BiUser className={styles.cardIcon}/>
                    <p className={styles.eventHost}>username</p>
                  </div>
                  <div className={styles.cardRowWrapper}>
                    <BiVideo className={styles.cardIcon}/>
                    <p className={styles.eventStartTime}>{moment(e.startTime).format("ddd, MMM D, LT")}</p>
                  </div>
                  {e.description ? <p className={styles.eventDescription}>{e.description}</p> : ''}
                </li>
              </Link>
            )) : ''}
          </ul>
        </section>

        <section className={styles.sectionWrapper}> 
          <h2 className={styles.categoryTitle}>Upcoming Events</h2>
          <ul className={`${styles.eventsGrid} ${styles.lastGrid}`}>
            {futureEvents ? futureEvents.map((e, i) => (
              <Link to={`/event/${e._id}`} className={`${styles.eventCard} ${styles.noUnderline}`}>
                <li key={i}>
                  <h3 className={styles.eventTitle}>{e.title}</h3>
                  <p className={styles.eventTopic}>{e.topic}</p>
                  <div className={styles.cardRowWrapper}>
                    <BiUser className={styles.cardIcon}/>
                    <p className={styles.eventHost}>username</p>
                  </div>
                  <div className={styles.cardRowWrapper}>
                    <BiVideo className={styles.cardIcon}/>
                    <p className={styles.eventStartTime}>{moment(e.startTime).format("ddd, MMM D, LT")}</p>
                  </div>
                  {e.description ? <p className={styles.eventDescription}>{e.description}</p> : ''}
                </li>
              </Link>
            )) : ''}
          </ul>
        </section>

      </main>

      <div className={styles.footerWrapper}>
        <div className={styles.footer}>
            <h3>Wizrd</h3>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.session.user,
  errors: state.errors.session,
  modal: state.ui.modal,
  fetchLiveEvents: fetchLiveEvents,
  fetchFutureEvents: fetchFutureEvents
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateModal: (modalName) => dispatch(updateModal(modalName))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
