import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';
import { translations } from './data';
import {correctGuess, incorrectGuess} from '../actions/update-data';
import './dashboard.css'

export class Dashboard extends React.Component {
    newLogIn = true;
    constructor(props) {
        super(props);
        this.state = {
            translation: '',
            submitted: false
        }

    }
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }
    // Welcome message will only display on initial load
    componentDidUpdate() {
        this.newLogIn = false;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.translation.toUpperCase() === this.props.protectedData.english.toUpperCase()) {
            this.setState({
                submitted: true
            });
            this.props.dispatch(correctGuess());
        } else {
            this.setState({
                translation: this.props.protectedData.english.toUpperCase(),
                submitted: true
            });
            this.props.dispatch(incorrectGuess());
        }
    }
    handleChange = (e) => {
        this.setState({ translation: e.target.value });
    }

    skipButton() {
        this.setState({ feedback: 'neutral' })
    }

    render() {
        let nameDisplay;
        if (this.newLogIn) {
            nameDisplay = <div className="col-12">Welcome {this.props.username}</div>
        }
        let cardContent;
        if (this.state.submitted) {
            cardContent = <p>
                {`${this.props.protectedData.spanish.toUpperCase()}/${this.props.protectedData.english.toUpperCase()}`}
            </p>
        } else {
            cardContent = <p>
                {this.props.protectedData.spanish.toUpperCase()}
            </p>
        }
        let percentageCorrect;
        if(this.props.protectedData.guesses === 0){
            percentageCorrect = 'No score yet for this question';
        }else{
            let percent = Math.round(this.props.protectedData.correct/this.props.protectedData.guesses*100);
            percentageCorrect = `Percentage Correct for this question: ${percent}%`;
        }

        return (
            <main role="main" className="dashboard row">
                {nameDisplay}
                <div className="percentage">{percentageCorrect}</div>
                <div className="flashcard" className={this.props.feedback}>
                    {cardContent}
                </div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label htmlFor="answer">
                        <input
                            type="text"
                            name="answer"
                            id="answer"
                            placeholder="english translation"
                            value={this.state.translation}
                            onChange={this.handleChange} />
                    </label>
                    <button type="submit" disabled={this.state.submitted}>submit</button>
                    <button type="button" onClick={() => this.skipButton()}>skip</button>
                </form>
            </main>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        protectedData: state.protectedData.data,
        currentUser: state.auth.currentUser,
        feedback: state.protectedData.feedback
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
