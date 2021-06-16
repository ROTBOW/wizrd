import React from "react";
import Chat from '../../chat/Chat';
import styles from './EventShowStyles.module.scss';


class EventShow extends React.Component {
    // Needs logic to check if the event has started yet, should show something if it hasn't started yet


    componentDidMount(){
        this.props.fetchEvent(this.props.match.params.eventId);
    }

    // handleStateEvent(e){
    //     e.preventDefault();
    // }

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
                    <div className={styles.wrapper} >
                        <div className={styles.leftWing}>
                            <h1 className={styles.eventTitle}>{event.title}</h1>
                            <img src="https://plchldr.co/i/650x450?bg=111111" alt="vid Placeholder" className={styles.videoFeed}/>
                            <p className={styles.normalText}>
                               {this.props.user.username} is streaming about <i className={styles.specialText}>{this.props.event.topic}</i></p>
                            <p className={styles.eventDesc}>{this.props.event.description}</p>

                        </div>

                        <div className={styles.rightWing}>
                            <article  className={styles.chatFeed}>
                                <Chat user={this.props.user} chatId={this.props.eventId}/>
                            </article>
                        </div>

                    </div>
                )

            }
        } else {
            return <div>I can't find any event info! make sure your on the right page.</div>
        }
    }
}

export default EventShow;