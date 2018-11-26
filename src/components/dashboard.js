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
            nameDisplay = <div>Welcome {this.props.username}</div>
        }
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                {nameDisplay}
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
            </div>
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
