import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';

class LoginFormClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Home page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    // Set or clear errors
    this.setState({errors: nextProps.errors})
  }

  // Handle field updates
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    let user = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    };
    this.props.login(user); 
  }

  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul className={styles.errorsWrapper}>
        {Object.values(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.authSectionWrapper}>
          <h1>Log in</h1>

          {this.renderErrors()}

          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={this.handleSubmit}>
              <label>Username or email:
                <input type="text" spellCheck="false" value={this.state.usernameOrEmail} onChange={this.update('usernameOrEmail')}placeholder="Your username or email" />
              </label>

              <label>Password:
                <input type="password" value={this.state.password} onChange={this.update('password')} placeholder="Your password" />
              </label>

              <div className={styles.spacer8}></div>

              <button type="submit" className={styles.button}>Sign in</button>
            </form>

            <p className={styles.authParagraph}>New to Wizrd? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>

        <div className={styles.authSectionDivider}></div>

        <section className={styles.authSectionWrapper}>
          <div className={styles.authHeaderWrapper}>
            <h2 className={styles.authSubtitle}>Want to try Wizrd without making an account?</h2>
            <p className={styles.authParagraph}>You can log in as one of our demo users.</p>
          </div>
          <div className={styles.formWrapper}>
            <form onSubmit={this.loginDemo} className={styles.form}>
              <button type="submit" className={`${styles.button} ${styles.secondary}`}>Log in as demo user</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(LoginFormClass);