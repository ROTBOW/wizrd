import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import styles from './About.module.scss';
import melissa from '../../assets/images/Melissa-pic.jpeg';
import josiah from '../../assets/images/Josiah-crap-pic.png';

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
            <img className={styles.memberPhoto} src="https://images.unsplash.com/photo-1581464647110-26e129ce2d02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" />
            <h3 className={styles.memberName}>Brandon Fang</h3>
            <p className={styles.memberParagraph}>
              <a href="">LinkedIn</a>
              <a href="">Github</a>
            </p>
          </div>
          
          <div className={styles.memberWrapper}>
            <img className={styles.memberPhotoJosiah} src={josiah} alt="" />
            <h3 className={styles.memberName}>Josiah Leon</h3>
            <p className={styles.memberParagraph}>
              <a href="https://www.linkedin.com/in/josiah-leon/">LinkedIn</a>
              <a href="https://github.com/ROTBOW">Github</a>
            </p>
          </div>

          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src={melissa} alt="" />
            <h3 className={styles.memberName}>Melissa Flynn</h3>
            <p className={styles.memberParagraph}>
              <a href="https://www.linkedin.com/in/melissa-flynn-372b84b7/">LinkedIn</a>
              <a href="https://github.com/melflynn">Github</a>
            </p>
          </div>

          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src="https://images.unsplash.com/photo-1581464647110-26e129ce2d02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" />
            <h3 className={styles.memberName}>Inho Lee</h3>
            <p className={styles.memberParagraph}>
              <a href="">LinkedIn</a>
              <a href="">Github</a>
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