import React from "react";
import Chat from '../../chat/Chat';


class EventShow extends React.Component {
    // Needs logic to check if the event has started yet, should show something if it hasn't started yet


    componentDidMount(){
        this.props.fetchEvent(this.props.match.params.eventId);
    }

    render(){
        if (this.props.event !== undefined) {
            let event = this.props.event
            let startTime = event.startTime;

            if (new Date(startTime) > new Date()) {

                return (
                    <div>
                        <h1>{event.title}</h1>
                        <p>
                            Oops... this event hasn't started yet! <br/>
                            It will be about <i>{event.topic}</i><br/>
                            come back on <i>{startTime}</i> so you don't miss it!
                        </p>

                    </div>
                )

            } else {

                return (
                    <div>
                        <h1>{event.title}</h1>
                        <div>this will be the video feed</div>
                        <Chat user={this.props.user} chatId={this.props.eventId} />
                    </div>
                )

            }
        } else {
            return <div>I can't find any event info! make sure your on the right page.</div>
        }
    }
}

export default EventShow;