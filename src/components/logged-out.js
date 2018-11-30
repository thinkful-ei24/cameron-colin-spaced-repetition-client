import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './logged-out.css';

export function LoggedOut(props){
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return(
    <div className="logged-out">
      <h2>You've been successfully logged out!</h2>
      <p>Click <Link to='/'>here</Link> to login again!</p>
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoggedOut);