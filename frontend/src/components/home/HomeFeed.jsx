import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './HomeFeed.module.scss';
import { fetchLiveEvents, fetchFutureEvents } from '../../util/eventUtil';
import Modal from '../modal/modal';
import { updateModal } from '../../actions/uiActions';
import { createEvent } from '../../actions/eventsActions';

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

  console.log(props);
  return (
    <div>
      {props.modal === 'createEvent' ? 
        <Modal 
          name='createEvent' 
          updateModal={props.updateModal} 
          createEvent={props.createEvent}
          history={props.history}
        /> : ''}
      <div className={styles.wrapper}>

        <div>
          <button onClick={() => props.updateModal('createEvent')}>Create Event</button>
        </div>
      
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
