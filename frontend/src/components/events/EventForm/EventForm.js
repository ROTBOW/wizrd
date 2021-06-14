import React from 'react';


class EventForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            topic: '',
            description: '',
            startDate: '',

        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
    }

    update(key) {
      return e => {
        this.setState({ [key]: e.target.value })
      }
    }

    render(){
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

                <input type='datetime-local' min={Date.now()}></input>

                <button type='submit'>Create Event</button>
            </form>
        )
    }
}


export default EventForm;