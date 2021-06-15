import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';

class LoginForm extends React.Component {
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

  // Handle field updates (called in the render method)
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
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className={styles.authPageWrapper}>

      
        <div className={styles.authSectionWrapper}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Username or email
                <input type="text"
                  value={this.state.usernameOrEmail}
                  onChange={this.update('usernameOrEmail')}
                  placeholder="Your username or email"
                />
              </label>

              <label>Password
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Your password"
                />
              </label>

              <button type="submit" className={styles.submitButton}>Sign in</button>

              {this.renderErrors()}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);