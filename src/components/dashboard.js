import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import UserProgress from './user-progress.js';
import {Link} from 'react-router-dom';
import { fetchProtectedData, updateProtectedData } from '../actions/protected-data';
//import { translations } from './data';
import { updateData } from '../actions/update-data';
import './dashboard.css'

export class Dashboard extends React.Component {
  newLogIn = true;
  constructor(props) {
    super(props);
    this.state = {
      translation: '',
      submitted: false,
      showProgress: false
    }
  }
  componentDidMount() {
    // should fetch HEAD
    this.props.dispatch(fetchProtectedData());
  }
  // Welcome message will only display on initial load
  componentDidUpdate() {
    this.newLogIn = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(updateProtectedData(this.props.protectedData.question, this.state.translation))
    this.props.dispatch(updateData());
    this.setState({ translation: '', submitted: true });
  }

  handleChange = (e) => {
    this.setState({ translation: e.target.value });
  }


  skipButton() {
    this.props.dispatch(fetchProtectedData());
    this.setState({
      translation: '',
      submitted: false,
    })
  }

  showProgress() {
    this.setState({
      showProgress: !this.state.showProgress
    })
  }

  render() {
    let nameDisplay;
    if (this.newLogIn) {
      nameDisplay = <div className="name"><p>Welcome {this.props.username}!</p></div>
    }

    let cardContent;
    if (this.state.submitted && this.props.protectedData.answer) {
      cardContent = <p>
        {`${this.props.protectedData.question.toUpperCase()} /`} <span lang="en">{`${this.props.protectedData.answer.toUpperCase()}`}</span>
      </p>
    } else {
      cardContent = <p>
        {this.props.protectedData.question.toUpperCase()}
      </p>
    }

    let percentageCorrect;
    if (this.props.protectedData.guesses === 0) {
      percentageCorrect = 'No score yet for this question';
    } else {
      let percent = Math.round(this.props.protectedData.correct / this.props.protectedData.guesses * 100);
      percentageCorrect = `Percentage Correct for this question: ${percent}%`;
    }

    let hideOrShowProgress;
    if(this.state.showProgress){
      hideOrShowProgress = 'Hide User Progress';
    }else{
      hideOrShowProgress = 'Show User Progress';
    }

    return (
      <main role="main" className="dashboard row">
        {nameDisplay}
        <Link to='/addcard'><button className="add-link">Add a New Card</button></Link>
        <div className="card-container">
          <div className="percentage">{percentageCorrect}</div>
          <div lang="es" className={`flashcard ${this.props.feedback}`} aria-label={this.props.feedback} aria-live="polite">
            {cardContent}
          </div>
        </div>
        <form className="answer-form" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="input-holder">
          <label htmlFor="answer">
            <input
              type="text"
              name="answer"
              id="answer"
              placeholder="english translation"
              value={this.state.translation}
              onChange={this.handleChange} />
          </label>
          </div>
          <div className="button-holder">
            <button type="submit" disabled={this.state.submitted}>Submit</button>
            <button type="button" disabled={!this.state.submitted} onClick={() => this.skipButton()}>Next</button>
          </div>
        </form>
        <div className="progress-button-holder">
          <button type="button" onClick={() => this.showProgress()}>{hideOrShowProgress}</button>
        </div>
        {this.state.showProgress && <UserProgress />}
        {this.state.showProgress &&
        <div className="progress-button-holder">
          <button type="button" className="hide-button" onClick={() => this.showProgress()}>Hide Stats</button>
        </div>}
      </main>
    );
  }
}


const mapStateToProps = state => {
  //const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    protectedData: state.protectedData.data,
    currentUser: state.auth.currentUser,
    feedback: state.protectedData.feedback
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
