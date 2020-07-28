import React from 'react';
import renderer from 'react-test-renderer';

import {PageFooter} from './page-footer';

describe(`Footer`, () => {
  it(`Should render correctly when is main page`, () => {
    const tree = renderer
      .create(<PageFooter
        isMainPage={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly when is not main page`, () => {
    const tree = renderer
      .create(<PageFooter
        isMainPage={false}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
