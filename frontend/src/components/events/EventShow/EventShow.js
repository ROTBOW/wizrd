import React from "react";
import Chat from '../../chat/Chat';
import Video from '../../video/Video/Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import styles from './EventShowStyles.module.scss';
import Moment from 'moment';
import MomentTimezone from 'moment-timezone';


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

  render() {
    if (this.props.event !== undefined) {
      let event = this.props.event
      let startTime = event.startTime;

      if (Moment(startTime).isAfter(Moment().tz('America/Los_Angeles'))) {
        return (
          <div>
            <h1 className={styles.earlyMessageTitle}>{event.title}</h1>
            <p className={styles.earlyMessage}>
              Oops... this event hasn't started yet!
                        </p>
            <p className={styles.earlyMessage}>
              It will be on&nbsp;<i className={styles.specialText}>{event.topic}</i>
            </p>
            <p className={styles.earlyMessage}>
              come back on&nbsp;<i className={styles.specialText}>{Moment(startTime).format("ddd, MMM D, LT")}</i>&nbsp;so you don't miss it!
            </p>
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
                    <div className={styles.hostAvatar}>

                    </div>
                    <div className={styles.broadcastHeading}>
                      <div className={styles.hostNameContainer}>
                        <span className={styles.hostName}>
                          Host Name
                        </span>
                        <span className={styles.userCount}>
                          <FontAwesomeIcon className={styles.userCountIcon} icon={faUserFriends} /> 14
                        </span>
                      </div>
                      <div className={styles.eventHeading}>
                        {event.title}
                      </div>
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