import React from 'react';
import styles from './EventForm.module.scss';


class EventForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      topic: '',
      description: '',
      startTime: this.getTime(),
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
      startTime: this.state.startTime
    };
    this.props.createEvent(submitForm)
      .then(event => {
        this.props.updateModal();
        this.props.history.replace(`/event/${event.event.data._id}`)
      })
  }

  update(key) {
    return e => {
      this.setState({ [key]: e.target.value })
    }
  }

  addZeroIfNeeded(val) {
    if (val < 10) {
      return `0${val}`
    }
    return val;
  }

  getTime() {
    let datetime = new Date();
    let month = this.addZeroIfNeeded(datetime.getMonth()+1);
    let day = this.addZeroIfNeeded(datetime.getDate());
    let hour = this.addZeroIfNeeded(datetime.getHours())
    let second = this.addZeroIfNeeded(datetime.getSeconds());

    return `${datetime.getFullYear()}-${month}-${day}T${hour}:${second}`
  }

  handleToggle(e){
    e.preventDefault();
    this.setState({liveToggle: !this.state.liveToggle})
  }

  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render(){
    return (
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={this.handleSubmit}onClick={(e) => e.stopPropagation()}>
          <h2>Create an Event</h2>

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
              placeholder="What's the topic of your stream?"
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

          <p className={styles.info}>Consequuntur beatae saepe incidunt quidem voluptatum, ab odit earum optio molestiae</p>

          {(this.state.liveToggle) ? (
            // first option
            <div className={styles.datetimeWrapper}>
              <button className={styles.toggleButton}onClick={this.handleToggle}>
                Schedule event for later
              </button>
              <button className={styles.submitButton} type='submit'>Create a live event now</button>
            </div>
          ) : (
            // second option
            <div className={styles.dateGrid}>
              <label>Start time:
                <input
                  type='datetime-local'
                  min={this.getTime()}
                  value={this.state.startTime}
                  onChange={this.update('startTime')}
                />
                <button className={styles.toggleButton} onClick={this.handleToggle}>Switch to live event</button>
              </label>

              <button className={styles.submitButton} type='submit'>Create an event for later</button>
            </div>
          )}


          {/* <button className={styles.submitButton} type='submit'>Create a live event now</button>
          <button className={styles.submitButton} type='submit'>Create an event for later</button> */}

          {this.renderErrors()}
        </form>
      </div>
    );
  }
}


export default EventForm;