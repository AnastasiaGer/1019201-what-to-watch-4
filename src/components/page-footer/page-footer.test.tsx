import * as React from 'react';
import * as renderer from 'react-test-renderer';
import history from '../../history';
import {Router} from 'react-router-dom';

import PageFooter from './page-footer';

it(`Should Footer render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <PageFooter/>
        </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
