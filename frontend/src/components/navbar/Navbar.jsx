import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  useEffect(() => {
    let timer = setInterval(() => {
      setMeetPos(meetPos + 1);
      if (meetPos >= 3) setMeetPos(0)
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  });


  const search = (e) => {
    e.preventDefault();
    const input = document.getElementById('searchInput');
    const param = document.getElementById('searchParam').value;
    if (input.value) {
      props.findEvents({[param]: input.value})
        .then(() => {
          history.push('/search');
        })
    }
  }
  

  const empty = pojo => {
    let count = 0;
    for (let i in pojo) count++;
    return count === 0
  }

  const sessionButtons = () => {
    if (empty(props.user)) {
      return (
        <>
          <Link to="/login"  className={styles.navLink}>
            <li>Log in</li>
          </Link>
          <Link to="/signup" className={styles.navLink}>
            <li>Sign up</li>
          </Link>
        </>
      );
    } else {
      return (
        <a className={styles.navLink} onClick={props.logout} href="/">
          <li>Log out</li>
        </a>        
      );
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.navBarLeft}>
            <div className={styles.logoWrapper}>
              <Link to="/">
                <img className={styles.logo} src={logo} alt="logo" />
              </Link>
            </div>
          </div>

          <div className={styles.navbarFill}>
            <div className={styles.searchWrapper}>
                <form className={styles.search}>
                  <select id="searchParam" className={styles.searchSelect} defaultValue="topic">
                    <option value="title">Title</option>
                    <option value="topic" selected>Topic</option>
                    <option value="description">Description</option>
                    <option value="host">Host</option>
                  </select>
                  <input className={styles.searchInput} id="searchInput" type="text" placeholder="Search for an event"/>
                  <button className={styles.searchButton} onClick={search}>Search</button>
                </form>
              </div>
          </div>

          <div className={styles.navWrapper}>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                {sessionButtons()}
              </ul>

              <div className={styles.divider}></div>

              <ul className={styles.navList}>
                <Link to="/about" className={styles.navLink}>
                  <li>About</li>
                </Link>
                <a className={styles.navLink} href="https://github.com/ROTBOW/wizrd" target="_blank" rel="noreferrer">
                  <li>GitHub</li>
                </a>
              </ul>

              {/* <TransitionGroup className={styles.navLink}>
                <CSSTransition
                  timeout={500}
                  classNames={styles.example}
                > */}
                {/* <div className={styles.navLink}>
                  {meet[meetPos]}
                </div> */}
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
