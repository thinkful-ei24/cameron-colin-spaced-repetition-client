import React from 'react';
import {Route} from 'react-router-dom';
import requiresLogin from './requires-login';
import './add-card.css';

export class AddCard extends React.Component{

  addCard(){
    console.log('clicked');
  }
  render(){
    console.log('hello');
    return (
      <div className="add-card">
        <h2>Add a new card to practice!</h2>
      <form className="add-card-form" onSubmit={() => this.addCard()}>
        <label htmlFor="spanish">Spanish:</label>
        <br/>
        <input type="text" id="spanish" name="spanish"></input>
        <br/>
        <label htmlFor="english">English</label>
        <br/>
        <input type="text" id="english" name="english"></input>
        <br/>
        <button type="submit" className="add-button">Add Card</button>
      </form>
      </div>
    );
  }
}

export default requiresLogin()(AddCard);



