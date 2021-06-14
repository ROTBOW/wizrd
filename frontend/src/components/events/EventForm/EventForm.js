import React from 'react';


class EventForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            topic: '',
            description: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                This will be a form to create an event
            </form>
        )
    }
}


export default EventForm;