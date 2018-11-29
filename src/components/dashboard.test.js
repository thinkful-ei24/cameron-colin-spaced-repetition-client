import React from 'react';
import {shallow, mount} from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import {Dashboard} from './dashboard';
const mockFetchProtectedDataAction = {
  type: 'FETCH_PROTECTED_DATA'
};
jest.mock('../actions/protected-data', () => Object.assign({},
  require.requireActual('../actions/protected-data'),
  {
    fetchProtectedData: jest.fn().mockImplementation(() => {
      return mockFetchProtectedDataAction;
    })
  }));

describe('<Dashboard/>', () => {
  const username = 'username';
  const protectedData = {question: 'agua', answer: 'water', guesses: 1, correct: 0};
  const feedback = 'correct';
  const currentUser = {username, jwt: 'asdfljafdoiafdnkdafs'};
  const dispatch = jest.fn();

  it('Should render without crashing', () => {
    shallow(<Dashboard 
      username={username}
      protectedData={protectedData}
      feedback={feedback}
      currentUser = {currentUser} 
      dispatch={dispatch}/>);
  });
  it('dispatches fetchProtectedData', () => {
    const dispatch = jest.fn();
      shallow(
        <Dashboard      username={username}
      protectedData={protectedData}
      feedback={feedback}
      currentUser = {currentUser} 
      dispatch={dispatch} />
);
      expect(dispatch).toHaveBeenCalledWith(mockFetchProtectedDataAction);
    }); 
})