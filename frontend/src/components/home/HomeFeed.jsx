import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './HomeFeed.module.scss';
import { fetchLiveEvents, fetchFutureEvents } from '../../util/eventUtil';

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

  return (
    <div className={styles.wrapper}>
    
      <div className={styles.sectionWrapper}> 
        <h2>Currently Streaming Events</h2>
        <ul>
          {liveEvents ? liveEvents.map((e, i) => {
            return <li key={i}>
                <Link to={`/event/${e._id}`}><h5>{e.title}</h5></Link>
                <p>{e.topic}</p>
              </li>
          }) : ''}
        </ul>
      </div>

      <div> 
        <h2>Upcoming Events</h2>
        <ul>
          {futureEvents ? futureEvents.map((e, i) => {
            return <li key={i}>
                <Link to={`/event/${e._id}`}><h5>{e.title}</h5></Link>
                <p>{e.topic}</p>
                <p>{e.startTime}</p>
              </li>
          }) : ''}
        </ul>
      </div>


    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.session.user,
  errors: state.errors.session,
  fetchLiveEvents: fetchLiveEvents,
  fetchFutureEvents: fetchFutureEvents

});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
