import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLiveEvents, fetchFutureEvents } from '../../util/eventUtil';
import Modal from '../modal/modal';
import { updateModal } from '../../actions/uiActions';
import { createEvent } from '../../actions/eventsActions';
import { BiUser, BiVideo } from 'react-icons/bi';
import styles from './Feed.module.scss';
import moment from 'moment';
import avatars from '../../assets/avatars/avatars';

const HomeFeed = (props) => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);

  useEffect(() => {
    let isOnHomeFeed = true;
    if (isOnHomeFeed) {
      props.fetchLiveEvents()
      .then(events => {
        setLiveEvents(events.data)
      });
    props.fetchFutureEvents()
      .then(events => {
        setFutureEvents(events.data.sort(function(a, b) {
          const first = a['startTime'];
          const second = b['startTime'];
          return (first > second) ? 1 : (first < second) ? -1 : 0;
        }))
      })
    }
    return () => isOnHomeFeed = false;
  }, [])

  return (
    <div>
      {props.modal === 'createEvent' ? 
        <Modal 
          name='createEvent' 
          updateModal={props.updateModal} 
          createEvent={props.createEvent}
          history={props.history}
        /> : ''}

      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Welcome to Wizrd, {props.user.username}<img src={avatars[Number(props.user.avatar)]} alt="avatar-Icon" width="45" height="45" className={styles.userAvatar}/></h1>
          <p className={styles.headerSubtitle}>
            Wizrd is a streaming platform for the teacher inside all of us. Experience the magic of learning by joining an event or creating your own.
          </p>
          <button className={styles.createEventButton} onClick={() => props.updateModal('createEvent')}>Create an event</button>
        </div>
      </div>

      <main className={styles.feedWrapper}>

        <section className={styles.sectionWrapper}> 
          <h2 className={styles.categoryTitle}>Currently Streaming Events</h2>
          
          <div className={styles.gridWrapper}>
            {/* <div className={styles.gridBlurLeft}></div> */}
            <ul className={styles.eventsGridHorizontal}>
              {liveEvents ? liveEvents.map((e, i) => (
                <Link to={`/events/${e._id}`} className={`${styles.eventCard} ${styles.noUnderline}`}  key={i}>
                  <li>
                    <h3 className={styles.eventTitle}>{e.title}</h3>
                    <p className={styles.eventTopic}>{e.topic}</p>
                    <div className={styles.cardRowWrapper}>
                      <BiUser className={styles.cardIcon}/>
                      <p className={styles.eventHost}>{e.hostUsername}</p>
                    </div>
                    <div className={styles.cardRowWrapper}>
                      <BiVideo className={styles.cardIcon}/>
                      <p className={styles.eventStartTime}>Live now</p>
                    </div>
                    {e.description ? <p className={styles.eventDescription}>{e.description}</p> : ''}
                  </li>
                </Link>
              )) : ''}
            </ul>
            {/* <div className={styles.gridBlurRight}></div> */}
          </div>

        </section>

        <section className={styles.sectionWrapper}> 
          <h2 className={styles.categoryTitle}>Upcoming Events</h2>
          <ul className={`${styles.eventsGridHorizontal} ${styles.lastGrid}`}>
            {futureEvents ? futureEvents.map((e, i) => (
              <Link to={`/events/${e._id}`} className={`${styles.eventCard} ${styles.noUnderline}`} key={i}>
                <li>
                  <h3 className={styles.eventTitle}>{e.title}</h3>
                  <p className={styles.eventTopic}>{e.topic}</p>
                  <div className={styles.cardRowWrapper}>
                    <BiUser className={styles.cardIcon}/>
                    <p className={styles.eventHost}>{e.hostUsername}</p>
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
  updateModal: (modalName) => dispatch(updateModal(modalName)),
  createEvent: event => dispatch(createEvent(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
