import React from 'react';
import renderer from 'react-test-renderer';
import PageReviews from './page-reviews.jsx';
import {movieReviews} from '../../utils/test-data.js';

describe(`PageReviews`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<PageReviews
        movieReviews={movieReviews}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
