import * as React from 'react';
import * as renderer from 'react-test-renderer';
import PageDetails from './page-details';
import {movieCard} from '../../test-data';

describe(`PageDetails`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<PageDetails
        currentMovie={movieCard}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
