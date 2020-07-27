import React from 'react';
import renderer from 'react-test-renderer';

import {PageHeader} from './page-header';

describe(`PageHeader`, () => {
  it(`Should render correctly when is main page and user signed in`, () => {
    const tree = renderer
      .create(<PageHeader
        isMainPage={true}
        isSignInPage={false}
        isSignedIn={true}
        onSignInClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly when is main page and user is not signed in`, () => {
    const tree = renderer
      .create(<PageHeader
        isMainPage={true}
        isSignInPage={false}
        isSignedIn={false}
        onSignInClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly when is not main page and not sign in page`, () => {
    const tree = renderer
      .create(<PageHeader
        isMainPage={false}
        isSignInPage={false}
        isSignedIn={false}
        onSignInClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly when is sign in page`, () => {
    const tree = renderer
      .create(<PageHeader
        isMainPage={false}
        isSignInPage={true}
        isSignedIn={false}
        onSignInClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
