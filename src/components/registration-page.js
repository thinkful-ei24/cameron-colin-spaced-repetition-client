import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home row">
          <div className="col-6 center">
            <section className="welcome-message">
              <h2>Register for Echar Agua al Mar!</h2>
              <p>Learn Spanish at your own pace ... and actually remember it!</p>
            </section>
          </div>
          <section className="col-6 center">
            <RegistrationForm />
          </section>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
