import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './HomeFeed.module.scss';

const HomeFeed = (props) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.temp}>
        <h3>You are logged in. Your username is @{props.user.username}.</h3>
      </div>


    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.session.user,
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed);
