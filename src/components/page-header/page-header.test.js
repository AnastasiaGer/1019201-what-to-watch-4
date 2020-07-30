import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from '../../history.js';

import {PageHeader} from './page-header';

const userInfo = {
  id: 1,
  email: `sadas@dsasd.ru`,
  name: `asdasd`,
  avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
};

describe(`PageHeader`, () => {
  it(`Should render correctly when is main page and user signed in`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <PageHeader
              isMainPage={true}
              isSignInPage={false}
              isSignedIn={true}
              onSignInClick={() => {}}
              userInfo={userInfo}
            />
          </Router>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly when is main page and user is not signed in`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <PageHeader
              isMainPage={true}
              isSignInPage={false}
              isSignedIn={false}
              onSignInClick={() => {}}
            />
          </Router>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly when is not main page and not sign in page`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <PageHeader
              isMainPage={false}
              isSignInPage={false}
              isSignedIn={false}
              onSignInClick={() => {}}
            />
          </Router>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly when is sign in page`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <PageHeader
              isMainPage={false}
              isSignInPage={true}
              isSignedIn={false}
              onSignInClick={() => {}}
            />
          </Router>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
