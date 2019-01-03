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
        <section className="welcome-message">
          <h2>Welcome to Echar Agua al Mar</h2>
          <p>Learn Spanish at your own pace ... and actually remember it!</p>
        </section>
      </div>
      <section className="col-6">
        <LoginForm />
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
