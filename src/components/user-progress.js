import React from 'react';
import {connect} from 'react-redux';
import ProgressQuestion from './progress-question.js';
import {getUserProgress} from '../actions/user-progress.js';
import './user-progress.css';
import './user-progress.css';

export class UserProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.dispatch(getUserProgress());
  }

  render() {
    if(this.props.progress.questions.length === 0){
      return <div>Add Cards to See Progress</div>
    }
    const listOfWords = this.props.progress.questions.map((question, index) => {
      return <ProgressQuestion key={index} index={index} {...question}/>
    })

    return (
      <section aria-live="polite" className="row user-progress">
        <h2>user progress</h2>
        <ul className="row">{listOfWords}</ul>
      </section>
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
