import * as React from 'react';
import * as renderer from 'react-test-renderer';
import PageOverview from './page-overview';
import {movieCard} from '../../test-data';

describe(`PageOverview`, () => {
  it(`Should render correctly`, () => {

    const tree = renderer
      .create(<PageOverview
        currentMovie={movieCard}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
