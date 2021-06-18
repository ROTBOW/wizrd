import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import { BiX, BiSearch } from 'react-icons/bi'

const Navbar = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    const input = document.getElementById('searchInput');
    const param = document.getElementById('searchParam').value;
    if (input.value) {
      props.findEvents({[param]: input.value})
        .then(() => {
          history.push('/search');
        });
    }
  };

  const clearSearch = (e) => {
    e.preventDefault();
    const input = document.getElementById('searchInput');
    input.value = '';
  };
  
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
          <div className={styles.logoWrapper}>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </Link>
          </div>

          <div className={styles.searchWrapper}>
            <form className={styles.searchBar}>
              <div className={styles.selectWrapper}>
                <select id="searchParam" className={styles.searchSelect} defaultValue="all">
                  <option value="all">All Fields</option>
                  <option value="title">Title</option>
                  <option value="topic">Topic</option>
                  <option value="description">Description</option>
                  <option value="host">Host Name</option>
                </select>
              </div>
              <input className={styles.searchInput} id="searchInput" type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              <div className={styles.searchInputXWrapper}>
                <button type="button" className={styles.searchInputX} onClick={clearSearch}><BiX /></button>
              </div>
              <button type="submit" className={styles.searchButton} onClick={search}><BiSearch /></button>
            </form>
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
            </nav>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
