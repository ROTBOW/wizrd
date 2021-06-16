import React from 'react';


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
      
      let liveToggle = (this.state.liveToggle) ? 
      <button onClick={this.handleToggle}>
        Schedule event for later
      </button> : <div><input
                    type='datetime-local'
                    min={this.getTime()}
                    value={this.state.startTime}
                    onChange={this.update('startTime')}
                  />
                  <button onClick={this.handleToggle}>Switch to live Event</button>
                  </div>

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Create a Event</h1>

                <label>Title:
                    <input
                      type="text"
                      placeholder="Title"
                      onChange={this.update('title')}
                      required
                    />
                </label>

                <label>Topic:
                    <input
                      type="text"
                      placeholder="topic"
                      required
                      onChange={this.update('topic')}
                    />
                </label>

                <label>Description:
                    <input
                      type="text"
                      placeholder="Description"
                      onChange={this.update('description')}
                    />
                </label>

                {liveToggle}

                <button type='submit'>Create Event</button>
                {this.renderErrors()}
            </form>
        )
    }
}


export default EventForm;