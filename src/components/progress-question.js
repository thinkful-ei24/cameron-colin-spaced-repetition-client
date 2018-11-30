import React from 'react';
import {connect} from 'react-redux';
import './progress-question.css';
import {deleteCard} from '../actions/delete-card';

export class ProgressQuestion extends React.Component {
  constructor(props){
    super(props)
  }

  hasGuessed = <p>{Math.floor(this.props.correct/this.props.guesses*100)}% success rate</p>;
  hasNotGuessed = <p>no data yet</p>;

  deleteClick(){
    this.props.dispatch(deleteCard(this.props.question, this.props.guesses, this.props.correct));
  };

  render(){
    return (
      <li id={this.props.index} className="col-3">
        <button className="delete-button" onClick={() => this.deleteClick()}>
          <i className="fa fa-trash" aria-hidden="true">
          </i></button>
        <h3>{this.props.question}</h3>
        {this.props.guesses ? this.hasGuessed : this.hasNotGuessed}
      </li>
    )
  }
}

export default connect()(ProgressQuestion);

