import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './HomeFeed.module.scss';
import { fetchLiveEvents } from '../../util/eventUtil';

const HomeFeed = (props) => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);

  useEffect(() => {
    props.fetchLiveEvents()
      .then(events => {
        // let live = [];
        // for (e in events) {
        //   live.push(e);
        // };
        console.log(liveEvents);
        setLiveEvents(events.data)
        console.log(liveEvents);
      });
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.temp}>
        <h3>You are logged in. Your username is @{props.user.username}.</h3>
      </div>

      <div> 
        <h4>Currently streaming events</h4>
        <ul>
          {liveEvents ? liveEvents.map((e, i) => {
            return <li key={i}>{e.title}</li>
          }) : ''}
        </ul>
      </div>

    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.session.user,
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchLiveEvents: fetchLiveEvents
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
