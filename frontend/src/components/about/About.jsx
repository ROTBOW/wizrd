import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './About.module.scss';
import melissa from '../../assets/images/melissa.jpeg';
import josiah from '../../assets/images/josiah.png';
import joe from '../../assets/images/inho.jpeg';
import brandon from '../../assets/images/brandon.jpg';

const About = () => {
  
  useEffect(() => {
    document.title = 'Wizrd - About';
    return () => document.title = 'Wizrd';
  });
  
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.about}>
        <h1>About</h1>
        <p>
           Welcome to Wizrd! Wizrd is a streaming platform for the teacher inside all of us. It offers users the ability to create and host live streaming events to teach other users about their passions! Do you have a really great recipe to share? Are you an impressive dog trainer? Dying to share the secrets you used to learn to play guitar? You name it! Viewers can watch the livestream from the host and join in the chat room to ask questions or make general commentary. The magic of every day learning is here, what are you waiting for?
        </p>

        <h2 className={styles.subtitle}>Meet the Team</h2>

        <div className={styles.teamGrid}>
          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src={brandon} alt="" />
            <h3 className={styles.memberName}>Brandon Fang</h3>
            <p className={styles.memberInfo}>
              <a href="https://www.linkedin.com/in/bdmfang">LinkedIn</a>
            </p>
            <p className={styles.memberInfo}>
              <a href="https://github.com/brandonfang">GitHub</a>
            </p>
          </div>
          
          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src={josiah} alt="" />
            <h3 className={styles.memberName}>Josiah Leon</h3>
            <p className={styles.memberInfo}>
              <a href="https://www.linkedin.com/in/josiah-leon/">LinkedIn</a>
            </p>
            <p className={styles.memberInfo}>
              <a href="https://github.com/ROTBOW">GitHub</a>
            </p>
          </div>

          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src={melissa} alt="" />
            <h3 className={styles.memberName}>Melissa Flynn</h3>
            <p className={styles.memberInfo}>
              <a href="https://www.linkedin.com/in/melissa-flynn-372b84b7/">LinkedIn</a>
            </p>
            <p className={styles.memberInfo}>
              <a href="https://github.com/melflynn">GitHub</a>
            </p>
          </div>

          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src={joe} alt="" />
            <h3 className={styles.memberName}>Inho Lee</h3>
            <p className={styles.memberInfo}>
              <a href="https://www.linkedin.com/in/inhojl">LinkedIn</a>
            </p>
            <p className={styles.memberInfo}>
              <a href="https://github.com/inhojl">GitHub</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  user: state.session.user,
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(About);