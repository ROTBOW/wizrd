import React from 'react';
import styles from './EventForm.module.scss';
import moment from 'moment';

class EventFormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      topic: '',
      description: '',
      startTime: moment().format('YYYY-MM-DDTkk:mm'),
      liveToggle: false,
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }


  handleSubmit(e){
    e.preventDefault();
    let submitForm = {
      title: this.state.title,
      topic: this.state.topic,
      description: this.state.description,
      startTime: this.state.startTime + ':59.999Z'
    };
    this.props.createEvent(submitForm)
      .then((event) => {
        this.props.updateModal();
        this.props.history.replace(`/events/${event.event.data._id}`)
      })
  }

  update(key) {
    return e => {
      this.setState({ [key]: e.target.value })
    }
  }
  
  handleToggle(e){
    e.preventDefault();
    this.setState({liveToggle: !this.state.liveToggle})
  }
  
  renderErrors() {
    return(
      <ul>
        {Object.values(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render(){
    return (
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={this.handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2>Create an Event</h2>

          {this.renderErrors()}

          <label>Title:
            <input
              type='text'
              placeholder='Give your event an eye-catching title!'
              onChange={this.update('title')}
              required
            />
          </label>

          <label>Topic:
            <input
              type='text'
              placeholder="What's the topic?"
              required
              onChange={this.update('topic')}
            />
          </label>

          <label>Description:
            <textarea
              rows='3'
              placeholder='Give your event a longer description (optional)'
              onChange={this.update('description')}
            />
          </label>

          <p className={styles.info}>Choose to start your event now, or set a later start time to schedule your event in the future</p>

          {(this.state.liveToggle) ? (
            <>
              <div className={styles.dateTimeWrapper}>
                <button className={styles.toggleButton} onClick={this.handleToggle}>Switch to future event</button>
                <p className={styles.liveInfo}>Your event will start as soon as you press <em>Create a live event now</em></p>
              </div>
              <button className={styles.submitButton} type='submit'>Create a live event now</button>
            </>
          ) : (
            <>
              <div className={styles.dateTimeWrapper}>
                <button className={styles.toggleButton} onClick={this.handleToggle}>Switch to live event</button>

                <label className={styles.startTime}>Start time:
                  <input
                    className={styles.startTimeInput}
                    type='datetime-local'
                    min={moment().format('YYYY-MM-DDTkk:mm')}
                    value={this.state.startTime}
                    onChange={this.update('startTime')}
                  />
                </label>
              </div>
              <button className={styles.submitButton} type='submit'>Create an event for later</button>
            </>
          )}
        </form>
      </div>
    );
  }
}


export default EventFormClass;