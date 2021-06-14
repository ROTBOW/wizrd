import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import { Link } from 'react-router-dom';

class temp extends React.Component {
    render(){
        return (
            <div>
                Welcome to this site, I guess...
                <Link to="/login">login</Link>
                <Link to="/Signup">Signup</Link>
            </div>
        )
    }
}


const App = () => (
    <div>
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/" component={temp} />
      </Switch>
    </div>
  );
  
  export default App;