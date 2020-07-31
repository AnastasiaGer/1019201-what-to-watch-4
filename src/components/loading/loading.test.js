import React from 'react';
import renderer from 'react-test-renderer';
import Loading from './loading.jsx';

describe(`Loader`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Loading />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
