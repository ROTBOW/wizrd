import React, { useState, useEffect } from 'react';
import styles from '../SessionForm.module.scss';
import avatars from '../../../assets/avatars/avatars';

const SignupFormContent = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState('0');
  const [loginButton, setLoginButton] = useState('');

  useEffect(() => {
    setErrors({});
    document.title = 'Wizrd - Log in';
    return () => {
      document.title = 'Wizrd';
    }
  }, [])

  const onValueChange = (event) => {
    setAvatar(event.target.value);
  }

  const checkIfSelected = (pos) => {
    if (avatar === String(pos)) {
      return styles.avatarSelected;
    }
    return '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email,
      username,
      password,
      password2,
      avatar
    };
    props.signup(user, props.history)
      .then((user) => {
        if (!!user) {
          props.login({
            usernameOrEmail: user.userData.data.usernameOrEmail,
            password: user.userData.data.password
          })
          if (props.modal) props.updateModal();
        }
      });
  };

  const renderErrors = () => (
    <ul className={styles.errorsWrapper}>
      {Object.values(props.errors).map((error, i) => (
        <li key={`error-${i}`}>
          {error}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.authSectionWrapper}>
      
      {renderErrors()}

      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>

          <p className={styles.inputSubtext}>Choose an avatar</p>
          <div className={styles.avatarWrapper}>
            <label>
              <input
                type="radio"
                value="0"
                checked={avatar === '0'}
                onChange={onValueChange}
                className={styles.hideMe}
              />
              <img src={avatars[0]} alt="" className={`${styles.avatarIcon} ${checkIfSelected(0)}`}/>
            </label>
            
            <label>
              <input
                type="radio"
                value="1"
                checked={avatar === '1'}
                onChange={onValueChange}
                className={styles.hideMe}
              />
              <img src={avatars[1]} alt="" className={`${styles.avatarIcon} ${checkIfSelected(1)}`}/>
            </label>

            <label>
              <input
                type="radio"
                value="2"
                checked={avatar === '2'}
                onChange={onValueChange}
                className={styles.hideMe}
              />
              <img src={avatars[2]} alt="" className={`${styles.avatarIcon} ${checkIfSelected(2)}`}/>
            </label>

            <label>
              <input
                type="radio"
                value="3"
                checked={avatar === '3'}
                onChange={onValueChange}
                className={styles.hideMe}
              />
              <img src={avatars[3]} alt="" className={`${styles.avatarIcon} ${checkIfSelected(3)}`}/>
            </label>

            <label>
              <input
                type="radio"
                value="4"
                checked={avatar === '4'}
                onChange={onValueChange}
                className={styles.hideMe}
              />
              <img src={avatars[4]} alt="" className={`${styles.avatarIcon} ${checkIfSelected(4)}`}/>
            </label>
          </div>

          <label>Username:
            <input type="text" required spellCheck="false" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your username" />
          </label>

          <label>Email:
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
          </label>

          <label>Password:
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
          </label>

          <label>Confirm your password:
            <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Your password" />
          </label>

          <div className={styles.spacer8}></div>

          <button type="submit" className={styles.button}>Create a new account</button>
        </form>

      </div>
    </section>
  );
}

export default SignupFormContent;