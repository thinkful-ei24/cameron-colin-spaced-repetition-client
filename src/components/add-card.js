import React from 'react';
import {Route} from 'react-router-dom';

export default class AddCard extends React.Component{
  render(){
    return (
      <form className="add-card-form">
        <label htmlFor="spanish">Spanish:</label>
        <input type="text" id="spanish" name="spanish"></input>
        <label htmlFor="english">English</label>
        <input type="text" id="english" name="english"></input>
      </form>
    )
  }
}



