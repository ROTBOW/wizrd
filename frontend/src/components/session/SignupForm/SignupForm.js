import React from 'react';
import { withRouter } from 'react-router-dom';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSignedUp === true) {
      this.props.history.push('/login');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(user)

    this.props.signup(user, this.props.history);
  }

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
            <div className="signup-form">
              <label>Email:
                <input type="email"
                  value={this.state.email}
                  onChange={this.update('email')}
                  placeholder="Your email"
                />
              </label>

              <label>Username:
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  placeholder="Your username"
                />
              </label>

              <label>Password:
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Your password"
                />
              </label>

              <label>Confirm your password:
                <input type="password"
                  value={this.state.password2}
                  onChange={this.update('password2')}
                  placeholder="Confirm your password"
                />
              </label>

              <button type="submit" className={styles.submitButton}>Create a new account</button>

              {this.renderErrors()}
            </div>
          </form>

        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);