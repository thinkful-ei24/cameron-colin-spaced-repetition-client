import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import './add-card.css';
import {addCard} from '../actions/add-card';

export class AddCard extends React.Component{
  constructor(props){
    super(props);
    this.spanish = React.createRef();
    this.engligh = React.createRef();
  }
  addCard(){
    addCard(this.spanish.current.values, this.engligh.current.value);
  }
  render(){
    console.log('hello');
    return (
      <div className="add-card">
        <h2>Add a new card to practice!</h2>
      <form className="add-card-form" onSubmit={() => this.addCard()}>
        <label htmlFor="spanish">Spanish:</label>
        <br/>
        <input type="text" id="spanish" name="spanish" ref={this.spanish}></input>
        <br/>
        <label htmlFor="english">English:</label>
        <br/>
        <input type="text" id="english" name="english" ref={this.engligh}></input>
        <br/>
        <button type="submit" className="add-button">Add Card</button>
      </form>
      </div>
    );
  }
}

export default requiresLogin()(connect()(AddCard));



