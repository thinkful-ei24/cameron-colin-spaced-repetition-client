import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
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
      submitted: false
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

    // if (this.state.translation.toUpperCase() === this.props.protectedData.english.toUpperCase()) {
    //   this.setState({
    //     submitted: true
    //   });
    //   this.props.dispatch(correctGuess());
    // } else {
    //   this.setState({
    //     translation: this.props.protectedData.english.toUpperCase(),
    //     submitted: true
    //   });
    //   this.props.dispatch(incorrectGuess());
    // }
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


  render() {
    console.log(this.props.protectedData)
    let nameDisplay;
    if (this.newLogIn) {
      nameDisplay = <div className="name"><p>Welcome {this.props.username}!</p></div>
    }
    let cardContent;
    if (this.state.submitted && this.props.protectedData.answer) {
      cardContent = <p>
        {`${this.props.protectedData.question.toUpperCase()} / ${this.props.protectedData.answer.toUpperCase()}`}
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
    console.log(this.props.feedback);

    return (
      <main role="main" className="dashboard row">
        {nameDisplay}
        <div className="card-container">
          <div className="percentage">{percentageCorrect}</div>
          <div className={`flashcard ${this.props.feedback}`}>
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
