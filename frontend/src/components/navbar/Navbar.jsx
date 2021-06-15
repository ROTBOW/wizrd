import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const Navbar = (props) => {

  const [meetPos, setMeetPos] = useState(0);
  const [meet, setMeet] = useState([
    <a href="https://github.com/brandonfang" target="_blank" rel="noreferrer"  key="1">Meet Brandon</a>,
    <a href="https://github.com/inhojl" target="_blank" rel="noreferrer" key="2" >Meet Joe</a>,
    <a href="https://github.com/melflynn" target="_blank" rel="noreferrer" key="3" >Meet Melissa</a>,
    <a href="https://github.com/ROTBOW" target="_blank" rel="noreferrer" key="4" >Meet Josiah</a>
  ]);

  useEffect(() => {
    let timer = setInterval(() => {
      setMeetPos(meetPos + 1);
      if (meetPos >= 3) setMeetPos(0)
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  })


  // const greeting = () => {
  //   if (loggedIn) {
  //     return <div></div>
  //   } else {
  //     return <div></div>
  //   }
  // };

  return (
    <header className={styles.header}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.logoWrapper}>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </Link>
          </div>

          <div className={styles.navWrapper}>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navLink}>
                  <Link to="/login">Log in</Link>
                </li>
                <li className={styles.navLink}>
                  <Link to="/signup">Sign up</Link>
                </li>
                <li className={styles.navLink}>
                  <div onClick={props.logout}>Log out</div>
                </li>
              </ul>

              <div className={styles.divider}></div>

              <ul className={styles.navList}>
                <li className={styles.navLink}>
                  <a href="https://github.com/ROTBOW/MERN-stack-project" target="_blank" rel="noreferrer">GitHub</a>
                </li>
              </ul>


              {/* <TransitionGroup className={styles.navLink}>
                <CSSTransition
                  timeout={500}
                  classNames={styles.example}
                > */}
                <div className={styles.navLink}>
                  {meet[meetPos]}
                </div>
                {/* </CSSTransition>
              </TransitionGroup> */}


            </nav>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
