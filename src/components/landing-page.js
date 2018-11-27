import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

  return (
    <div className="home row">
      <div className="col-6 center">
        <div className="welcome-message">
          <h2>Welcome to Echar Agua al Mar</h2>
          <p>Learn Spanish at your own pace ... and actually remember it!</p>
        </div>
      </div>
      <div className="col-6">
        <LoginForm />
        <p id="get-account" >Don't have an account yet? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
