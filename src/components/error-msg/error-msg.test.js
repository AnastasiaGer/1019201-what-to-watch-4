import React from 'react';
import renderer from 'react-test-renderer';
import ErrorScreen from './error-msg.jsx';
import {Router} from 'react-router-dom';
import history from '../../history';

describe(`ErrorScreen`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <ErrorScreen />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
