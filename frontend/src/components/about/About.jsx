import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import styles from './About.module.scss';

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
           Welcome to Wizrd! Wizrd is a streaming platform for the teacher inside all of us. 
        </p>

        <h2 className={styles.subtitle}>Meet the Team</h2>

        <div className={styles.teamGrid}>
          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src="https://images.unsplash.com/photo-1581464647110-26e129ce2d02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" />
            <h3 className={styles.memberName}>Brandon Fang</h3>
            <p className={styles.memberParagraph}>
              Y'all need to put your own crap here, fugiat iure ea sunt dolor ducimus voluptas id temporibus reprehenderit neque saepe ab atque quae quisquam iusto. Ex earum recusandae minus deserunt quibusdam sunt in, deleniti accusantium reiciendis quos omnis ea odit labore non placeat eius unde eveniet quisquam error rerum dolore, minima totam!
            </p>
          </div>
          
          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src="https://images.unsplash.com/photo-1581464647110-26e129ce2d02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" />
            <h3 className={styles.memberName}>Josiah Leon</h3>
            <p className={styles.memberParagraph}>
            Y'all need to put your own crap here, fugiat iure ea sunt dolor ducimus voluptas id temporibus reprehenderit neque saepe ab atque quae quisquam iusto. Ex earum recusandae minus deserunt quibusdam sunt in, deleniti accusantium reiciendis quos omnis ea odit labore non placeat eius unde eveniet quisquam error rerum dolore, minima totam!
            </p>
          </div>

          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src="https://images.unsplash.com/photo-1581464647110-26e129ce2d02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" />
            <h3 className={styles.memberName}>Melissa Flynn</h3>
            <p className={styles.memberParagraph}>
            Y'all need to put your own crap here, fugiat iure ea sunt dolor ducimus voluptas id temporibus reprehenderit neque saepe ab atque quae quisquam iusto. Ex earum recusandae minus deserunt quibusdam sunt in, deleniti accusantium reiciendis quos omnis ea odit labore non placeat eius unde eveniet quisquam error rerum dolore, minima totam!
            </p>
          </div>

          <div className={styles.memberWrapper}>
            <img className={styles.memberPhoto} src="https://images.unsplash.com/photo-1581464647110-26e129ce2d02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" />
            <h3 className={styles.memberName}>Inho Lee</h3>
            <p className={styles.memberParagraph}>
            Y'all need to put your own crap here, fugiat iure ea sunt dolor ducimus voluptas id temporibus reprehenderit neque saepe ab atque quae quisquam iusto. Ex earum recusandae minus deserunt quibusdam sunt in, deleniti accusantium reiciendis quos omnis ea odit labore non placeat eius unde eveniet quisquam error rerum dolore, minima totam!
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