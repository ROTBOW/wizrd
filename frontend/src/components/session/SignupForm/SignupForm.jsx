import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.isSignedUp === true) {
  //     this.props.history.push('/login');
  //   }

  //   this.setState({errors: nextProps.errors})
  // }

  componentDidMount() {
    this.setState({ errors: {} });
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.signup(user, this.props.history)
      .then((user) => this.props.login(user));
  }

  renderErrors() {
    return(
      <ul className={styles.errorsWrapper}>
        {Object.values(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className={styles.pageWrapper}>
        <section className={styles.authSectionWrapper}>
          <h1>Sign up</h1>
          
          {this.renderErrors()}

          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={this.handleSubmit}>
              <label>Username:
                <input type="text" spellCheck="false" value={this.state.username} onChange={this.update('username')}placeholder="Your username" />
              </label>

              <label>Email:
                <input type="email" value={this.state.email} onChange={this.update('email')} placeholder="Your email" />
              </label>

              <label>Password:
                <input type="password" value={this.state.password} onChange={this.update('password')} placeholder="Your password" />
              </label>

              <label>Confirm your password:
                <input type="password" value={this.state.password2} onChange={this.update('password2')} placeholder="Your password" />
              </label>

              <div className={styles.spacer8}></div>

              <button type="submit" className={styles.button}>Create a new account</button>
            </form>

            <p className={styles.authParagraph}>Already have an account? <Link className={styles.authParagraph} to="/login">Log in</Link></p>
          </div>
        </section>

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

export default withRouter(SignupForm);