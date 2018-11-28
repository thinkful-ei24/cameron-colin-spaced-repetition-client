import React from 'react';
import {connect} from 'react-redux';
import './progress-question.css';

export default function ProgressQuestion(props) {
console.log(props)

  const hasGuessed = <p>{Math.floor(props.correct/props.guesses*100)}% success rate</p>;
  const hasNotGuessed = <p>no data yet</p>;

  return (
    <li id={props.index} className="col-3">
      <h3>{props.question}</h3>
      {props.guesses ? hasGuessed : hasNotGuessed}
    </li>
  )
}

