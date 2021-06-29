import React from "react";
import Chat from '../../chat/Chat';
import Video from '../../video/Video/Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import styles from './EventShowStyles.module.scss';
import Moment from 'moment';
import MomentTimezone from 'moment-timezone';
import { updateEvent } from "../../../actions/eventsActions";
import avatars from '../../../assets/avatars/avatars';
import forest from '../../../assets/sebastian-unrau-sp-p7uuT0tw-unsplash (1).jpg';
import Modal from '../../modal/modal';


class EventShow extends React.Component {

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId)
      .then((res) => document.title = `Wizrd - ${res.event.data.title}`);
  }

  componentWillUnmount() {
    document.title = 'Wizrd';
  }

  getPST(now) {
    now = new Date(now)
    now.setHours(now.getHours() + 7);
    return Moment(now).tz('America/Los_Angeles');
  }

  onEndEvent = (e) => {

    if (window.confirm('Are you sure you want to end the event?')) {
      console.log('ending event')
      const event = {
        ...this.props.event,
        isOver: true
      }
      this.props.updateEvent(event);
    }
  }

  render() {
    if (this.props.event !== undefined) {
      let event = this.props.event
      let startTime = event.startTime;
      const isHost = this.props.user.id === this.props.event.hostId;

      if ((Moment(startTime).isAfter(Moment().tz('America/Los_Angeles'))) || (this.props.event.isOver)) {
        return (
          <div>
            {this.props.modal === 'editEvent' ?
            <Modal 
              name='editEvent'
              updateModal={this.props.updateModal}
              updateEvent={this.props.updateEvent}
            /> : null}
            <div className={styles.beforePage}>
              <div className={styles.imageBox}>
                <img src={forest} className={styles.beforeImage}/>
                {(Moment(startTime).isAfter(Moment().tz('America/Los_Angeles'))) ? 
                <p>The Magic Awaits...</p> :
                <p>This stream has ended. Head back to the home page to discover more Wizrdry...</p>}
              </div>
              <div className={`${styles.broadcastInfo} ${styles.broadcastInfoBefore}`}>
                  <div className={styles.infoHeader}>
                    <div className={styles.hostAvatarWrapper}>
                      {event.hostAvatar ? 
                      <img src={avatars[Number(event.hostAvatar)]} className={styles.hostAvatar}/> :
                      ''}
                    </div>
                    <div className={styles.broadcastHeading}>
                      <div className={styles.hostNameContainer}>
                        <span className={styles.hostName}>
                          {event.hostUsername}
                        </span>
                      </div>
                      <div className={styles.eventHeading}>
                        {event.title}
                      </div>
                      {isHost ? 
                        <div className={styles.buttonContainer}>
                          <button onClick={() => this.props.updateModal('editEvent')}>
                            Edit Event
                          </button>
                        </div> :
                        null
                      }
                    </div>
                    </div>
                  <div className={styles.textInfo}>
                    <div className={styles.eventDescription}>
                      {event.description}
                    </div>
                    <ul className={styles.detailsList}>
                      <li className={styles.detailItem}>
                        <label className={styles.detailLabel}>
                          Start Time
                        </label>
                        <span className={styles.detailInfo}>
                          {new Date(event.startTime).toLocaleString()}
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <label className={styles.detailLabel}>
                          Topic
                        </label>
                        <span className={styles.detailInfo}>
                          {event.topic}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
        )
      // } else if (this.props.event.isOver) {
      //   return (
      //     <div>
      //       The event is over.
      //     </div>
      //   )
      } else {
        return (
          <div className={styles.eventShowContainer}>
            <div className={styles.eventShowContent}>
              <div className={styles.broadcastContainer}>
                <div className={styles.broadcastVideo}>
                  <Video
                    eventId={this.props.eventId} 
                    isHost={isHost}
                   />
                </div>
                <div className={styles.broadcastInfo}>
                  <div className={styles.infoHeader}>
                    <div className={styles.hostAvatarWrapper}>
                      {event.hostAvatar ? 
                      <img src={avatars[Number(event.hostAvatar)]} className={styles.hostAvatar}/> :
                      ''}
                    </div>
                    <div className={styles.broadcastHeading}>
                      <div className={styles.hostNameContainer}>
                        <span className={styles.hostName}>
                          {event.hostUsername}
                        </span>
                        <span className={styles.userCount}>
                          <FontAwesomeIcon className={styles.userCountIcon} icon={faUserFriends} /> <span id="viewerCount">0</span>
                        </span>
                      </div>
                      <div className={styles.eventHeading}>
                        {event.title}
                      </div>
                    </div>
                    {
                      isHost ? (
                        <div className={styles.buttonContainer}>
                          <button onClick={this.onEndEvent} className={styles.endEventButton}>
                            End Event
                          </button>
                        </div>
                      ) : null
                    }
                  </div>
                  <div className={styles.textInfo}>
                    <div className={styles.eventDescription}>
                      {event.description}
                    </div>
                    <ul className={styles.detailsList}>
                      <li className={styles.detailItem}>
                        <label className={styles.detailLabel}>
                          Start Time
                        </label>
                        <span className={styles.detailInfo}>
                          {new Date(event.startTime).toLocaleString()}
                        </span>
                      </li>
                      <li className={styles.detailItem}>
                        <label className={styles.detailLabel}>
                          Topic
                        </label>
                        <span className={styles.detailInfo}>
                          {event.topic}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.chatContainer}>
                <Chat user={this.props.user} chatId={this.props.eventId} />
              </div>
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