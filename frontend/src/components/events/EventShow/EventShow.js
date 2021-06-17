import React from "react";
import Chat from '../../chat/Chat';
import Video from '../../video/Video/Video';
import styles from './EventShowStyles.module.scss';


class EventShow extends React.Component {
  // Needs logic to check if the event has started yet, should show something if it hasn't started yet


  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }

  // handleStateEvent(e){
  //     e.preventDefault();
  // }


  render() {
    console.log('event', this.props.event)
    if (this.props.event !== undefined) {

      let event = this.props.event
      let startTime = event.startTime;

      if (new Date(startTime) > new Date()) {

        return (
          <div className={styles.wrapper}>
            <h1 className={styles.earlyMessageTitle}>{event.title}</h1>
            <div className={styles.earlyMessageBox}>
              <p className={styles.earlyMessage}>
                Oops... this event hasn't started yet!
                            </p>
              <p className={styles.earlyMessage}>
                It will be on&nbsp;<i className={styles.specialText}>{event.topic}</i>
              </p>
              <p className={styles.earlyMessage}>
                come back on&nbsp;<i className={styles.specialText}>{startTime}</i>&nbsp;so you don't miss it!
              </p>
            </div>
          </div>
        )

      } else {

        return (
          <div className={styles.eventShowContainer}>
            <div className={styles.eventShowContent}>
              <div className={styles.broadcastContainer}>
                <div className={styles.broadcastVideo}>
                  <Video eventId={this.props.eventId} isHost={this.props.user.id === this.props.event.hostId} />
                </div>
                <div className={styles.broadcastInfo}>
                  <div className={styles.infoHeader}>

                  </div>
                  <div className={styles.textInfo}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum odio commodi placeat a dicta dolore quia exercitationem totam numquam, amet reiciendis blanditiis aspernatur recusandae adipisci, itaque facilis temporibus, magni corporis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptatum debitis iure eos repellat non, enim est quam et nesciunt rem impedit nostrum laboriosam culpa ipsum dolor dolorum vero doloribus.lorem
                  </div>
                </div>
              </div>
              <div className={styles.chatContainer}>
                <Chat user={this.props.user} chatId={this.props.eventId} />
              </div>
            </div>
          </div>  
        )
          
          // <div className={styles.eventShowContainer}>
          //   <div className={styles.contentContainer}>
          //     <div className={styles.videoContainer}>
          //       <Video eventId={this.props.eventId} isHost={this.props.user.id === this.props.event.hostId} />
          //       <div className={styles.infoContainer}>
          //         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum odio commodi placeat a dicta dolore quia exercitationem totam numquam, amet reiciendis blanditiis aspernatur recusandae adipisci, itaque facilis temporibus, magni corporis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptatum debitis iure eos repellat non, enim est quam et nesciunt rem impedit nostrum laboriosam culpa ipsum dolor dolorum vero doloribus.lorem
          //       </div>
          //     </div>
          //     <div className={styles.chatContainer}>
          //       <Chat user={this.props.user} chatId={this.props.eventId} />
          //     </div>
          //   </div>
          // </div>
          // <div className={styles.wrapper} >
          //   <div className={styles.leftWing}>
          //     <h1 className={styles.eventTitle}>{event.title}</h1>
          //     <div className={styles.videoFeed}>
          //       <Video eventId={this.props.eventId} isHost={this.props.user.id === this.props.event.hostId} />
          //     </div>
          //     <p className={styles.normalText}>
          //       {this.props.user.username} is streaming about <i className={styles.specialText}>{this.props.event.topic}</i></p>
          //     <p className={styles.eventDesc}>{this.props.event.description}</p>

          //   </div>

          //   <div className={styles.rightWing}>
          //     <article className={styles.chatFeed}>
          //       <Chat user={this.props.user} chatId={this.props.eventId} />
          //     </article>
          //   </div>
          // </div>
      }
    } else {
      return <div>I can't find any event info! make sure your on the right page.</div>
    }
  }
}

export default EventShow;