import React from "react";



class EventShow extends React.Component {
    // Needs logic to check if the event has started yet, should show something if it hasn't started yet


    componentDidMount(){
        this.props.fetchEvent(this.props.match.params.eventId);
    }

    render(){
        if (this.props.event != undefined) {
            let startTime = this.props.event.startTime;

            console.log(new Date(startTime) > new Date());

            if (new Date(startTime) > new Date()) {
                return (
                    <div>
                        <h1>{this.props.event.title}</h1>
                        <p>Oops... this event hasn't started yet!, come back on <i>{Date(startTime)}</i> so you don't miss it!</p>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1>{this.props.event.title}</h1>
                        <div>this will be the video feed</div>
                        <div>this will be the chat room</div>
                    </div>
                )
            }
        } else {
            return <div>oops</div>
        }
    }
}

export default EventShow;