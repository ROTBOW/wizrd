import React from "react";


class EventShow extends React.Component {


    componentDidMount(){
        this.props.fetchEvent(this.props.match.params.eventId);
        this.props.fetchAllEvents()
    }

    render(){
        console.log(this.props.events);
        return (
            <div>
                {/* <h1>{this.props.event.title}</h1> */}
                <div>this will be the video feed</div>
                <div>this will be the chat room</div>
            </div>
        )
    }
}

export default EventShow;