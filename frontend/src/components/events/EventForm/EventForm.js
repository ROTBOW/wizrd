import React from 'react';


class EventForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            topic: '',
            description: '',
            startDate: this.getTime(),

            liveToggle: false

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let submitForm = {
          title: this.state.title,
          topic: this.state.topic,
          description: this.state.description,
          startDate: this.state.startDate
        };
        this.props.createEvent(submitForm);
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
      let second = this.addZeroIfNeeded(datetime.getSeconds());

      return `${datetime.getFullYear()}-${month}-${day}T${datetime.getHours()}:${second}`
    }

    handleToggle(e){
      e.preventDefault();
      this.setState({liveToggle: !this.state.liveToggle})
    }

    render(){
      
      let liveToggle = (this.state.liveToggle) ? 
      <button onClick={this.handleToggle}>
        Schedule event for later
      </button> : <div><input
                    type='datetime-local'
                    min={this.getTime()}
                    value={this.state.startDate}
                    onChange={this.update('startDate')}
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
            </form>
        )
    }
}


export default EventForm;