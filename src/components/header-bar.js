import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button
          id="logout"
          onClick={() => this.logOut()}>Log out
        </button>
      );
    }
    return (
      <nav role="navigation" className="header-bar">
        <h1>Echar Agua al Mar</h1>
        {logOutButton}
      </nav>
    );
  }
  }

  const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
  });

  export default connect(mapStateToProps)(HeaderBar);
