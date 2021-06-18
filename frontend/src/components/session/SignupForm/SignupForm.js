import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from '../SessionForm.module.scss';
import red from '../../../assets/avatars/avatarRed.png';
import green from '../../../assets/avatars/avatarGreen.png';
import yellow from '../../../assets/avatars/avatarYellow.png';



class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      avatar: '0',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.checkIfSelected = this.checkIfSelected.bind(this);
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
      password2: this.state.password2,
      avatar: this.state.avatar
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

  onValueChange(event) {
    this.setState({
      avatar: event.target.value
    });
  }

  checkIfSelected(pos) {
    if (this.state.avatar === String(pos)) {
      return styles.avatarSelected;
    }
    return ''
  }

  render() {
    return (
      <div className={styles.authPageWrapper}>

      
        <div className={styles.authSectionWrapper}>
          
          <form onSubmit={this.handleSubmit}>
            <div className="signup-form">

              <div className={styles.avatarWrapper}>
                <label>
                  <input
                    type="radio"
                    value="0"
                    checked={this.state.avatar === '0'}
                    onChange={this.onValueChange}
                    className={styles.hideMe}
                  />
                   <img src={red} className={`${styles.avatarIcon} ${this.checkIfSelected(0)}`}/>
                </label>
                
                <label>
                  <input
                    type="radio"
                    value="1"
                    checked={this.state.avatar === '1'}
                    onChange={this.onValueChange}
                    className={styles.hideMe}
                  />
                  <img src={green} className={`${styles.avatarIcon} ${this.checkIfSelected(1)}`}/>
                </label>

                <label>
                  <input
                    type="radio"
                    value="2"
                    checked={this.state.avatar === '2'}
                    onChange={this.onValueChange}
                    className={styles.hideMe}
                  />
                  <img src={yellow} className={`${styles.avatarIcon} ${this.checkIfSelected(2)}`}/>
                </label>
              </div>

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