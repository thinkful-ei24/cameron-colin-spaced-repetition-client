import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';

export class Dashboard extends React.Component {
    newLogIn = true;
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    // Welcome message will only display on initial load
    componentDidUpdate(){
        this.newLogIn = false;
    }

    render() {
        let nameDisplay;
        if(this.newLogIn){
            nameDisplay = <div className="col-12">Welcome {this.props.username}</div>
        }
        return (
            <main role="main" className="dashboard row">
                {nameDisplay}
                <div className="flashcard">
                  AQUA
                </div>
                <form>
                  <label for="answer">
                    <input
                      type="text"
                      name="answer"
                      id="answer"
                      placeholder="english translation" />
                  </label>
                      <button type="button">submit</button>
                      <button type="button">skip</button>
                    </form>
            </main>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        protectedData: state.protectedData.data,
        currentUser: state.auth.currentUser
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
