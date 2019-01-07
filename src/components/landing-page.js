import React from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';
import './landing-page.css';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

  return (
    <div className="home row">
      <div className="col-6">
        <div className="welcome-message">
          <h2>Welcome to Echar Agua al Mar</h2>
          <p>Learn Spanish at your own pace ... and actually remember it!</p>
          <h3>Demo Credentials</h3>
          <p>username: demo_user</p>
          <p>password: password321</p>
        </div>
      </div>
      <div className="col-6">
        <LoginForm />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
