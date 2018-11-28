import React from 'react';
import {connect} from 'react-redux';
import ProgressQuestion from './progress-question.js';
import {getUserProgress} from '../actions/user-progress.js';

export class UserProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.dispatch(getUserProgress())
  }

  render() {
    console.log(this.props.progress)
    const listOfWords = this.props.progress.questions.map((question, index) => {
      return <ProgressQuestion key={index} index={index} {...question}/>
    })

    return (
      <div>
        <h2>user progress</h2>
        <ul>{listOfWords}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    progress: state.progress
  };

}

export default connect(mapStateToProps)(UserProgress)
