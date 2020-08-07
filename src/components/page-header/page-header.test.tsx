import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from '../../history';
import {PageNames} from '../../const';

import {PageHeader} from './page-header';

const userInfo = {
  id: 1,
  email: `sadas@dsasd.ru`,
  name: `asdasd`,
  avatarURL: `https://4.react.pages.academy/wtw/asda.jpg`,
};

describe(`PageHeader`, () => {
  it(`Should render correctly when is main page and user signed in`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <PageHeader
              currentPage={PageNames.MAIN}
              isSignedIn={true}
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
              currentPage={PageNames.ADD_REVIEW}
              isSignedIn={false}
              userInfo={userInfo}
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
              currentPage={PageNames.ADD_REVIEW}
              isSignedIn={true}
              userInfo={userInfo}
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
              currentPage={PageNames.SIGN_IN}
              isSignedIn={false}
              userInfo={userInfo}
            />
          </Router>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
