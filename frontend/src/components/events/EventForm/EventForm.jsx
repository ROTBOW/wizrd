import React, { useState, useEffect } from 'react';
import styles from './EventForm.module.scss';
import moment from 'moment';

const EventForm = (props) => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(moment().tz('America/Los_Angeles').format('YYYY-MM-DDTkk:mm'));
  const [liveToggle, setLiveToggle] = useState(false);
  const [errors, setErrors] = useState(props.errors);

  useEffect(() => {
    // start a time ticker, but remove second argument
    return () => setStartTime(moment().format('YYYY-MM-DDTkk:mm'));
  }, [title, topic, description, liveToggle]);

  const handleToggle = (e) => {
    e.preventDefault();
    setLiveToggle(!liveToggle);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let event;
    if (!liveToggle) {

      event = {
        title,
        topic,
        description,
        startTime: moment(startTime).tz('America/Los_Angeles').format()
      };
    } else {
      event = {
        title,
        topic,
        description,
        startTime: moment().tz('America/Los_Angeles').format()
      };
    }


    props.createEvent(event)
      .then((event) => {
        props.updateModal();
        props.history.replace(`/events/${event.event.data._id}`)
      })
  }

  const renderErrors = () => {
    return(
      <ul>
        {Object.values(errors).map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h2>Create an Event</h2>

        {renderErrors()}

        <label>Title:
          <input
            type='text'
            placeholder='Give your event an eye-catching title!'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>Topic:
          <input
            type='text'
            placeholder="What's the topic?"
            required
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>

        <label>Description:
          <textarea
            rows='3'
            placeholder='Give your event a longer description (optional)'
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <p className={styles.info}>Choose to start your event now, or set a later start time to schedule your event in the future</p>

        {liveToggle ? (
          <>
            <div className={styles.dateTimeWrapper}>
              <button className={styles.toggleButton} onClick={(e) => handleToggle(e)}>Switch to future event</button>
              <p className={styles.liveInfo}>Your event will start as soon as you press <em>Create a live event now</em></p>
            </div>
            <button className={styles.submitButton} type='submit'>Create a live event now</button>
          </>
        ) : (
          <>
            <div className={styles.dateTimeWrapper}>
              <button className={styles.toggleButton} onClick={(e) => handleToggle(e)}>Switch to live event</button>

              <label className={styles.startTime}>Start time:
                <input
                  className={styles.startTimeInput}
                  type='datetime-local'
                  min={moment().format('YYYY-MM-DDTkk:mm')}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </label>
            </div>
            <button className={styles.submitButton} type='submit'>Create an event for later</button>
          </>
        )}
      </form>
    </div>
  );

};

export default EventForm;