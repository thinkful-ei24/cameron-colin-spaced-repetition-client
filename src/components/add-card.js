import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import './add-card.css';
import { submitCard, submitCardError, clearSubmitted } from '../actions/add-card';

export class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spanish: '',
      english: ''
    };
  }
  componentDidMount() {
    this.props.dispatch(clearSubmitted());
  }
  addCard(e) {
    e.preventDefault();
    if (this.state.spanish === '' || this.state.english === '') {
      this.dispatch(submitCardError('Fields cannot be null'))
    } else {
      this.props.dispatch(submitCard(this.state.spanish, this.state.english));
      this.setState({
        spanish: '',
        english: ''
      })
    }
  }

  setSpanish(e) {
    let spanish = e.target.value;
    this.setState({
      spanish
    });
  }

  setEnglish(e) {
    let english = e.target.value;
    this.setState({
      english
    });
  }

  render() {
    let error;
    if (this.props.error) {
      error = <div className="error">{this.props.error}</div>
    }
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    if (this.props.submitted) {
      return (
        <div className="card-added">
          <p>Your card has been added!</p>
          <button type="button" onClick={() => this.state.dispatch(clearSubmitted())}>Add another!</button>
        </div>);
    }
    return (
      <div className="add-card">
        <h2>Add a new card to practice!</h2>
        {error}
        <form className="add-card-form" onSubmit={(e) => this.addCard(e)}>
          <label htmlFor="spanish">Spanish:</label>
          <br />
          <input type="text" id="spanish" name="spanish" value={this.state.spanish} onChange={(e) => this.setSpanish(e)}></input>
          <br />
          <label htmlFor="english">English:</label>
          <br />
          <input type="text" id="english" name="english" value={this.state.english} onChange={(e) => this.setEnglish(e)}></input>
          <br />
          <button type="submit" className="add-button">Add Card</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  error: state.addCard.error,
  loading: state.addCard.loading,
  submitted: state.addCard.submitted
})

export default requiresLogin()(connect()(AddCard));



