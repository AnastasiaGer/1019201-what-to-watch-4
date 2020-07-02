import React from 'react';
import renderer from 'react-test-renderer';
import PageOverview from './page-overview.jsx';
import {movieCard} from '../../utils/test-data.js';

describe(`PageOverview`, () => {
  it(`Should render correctly`, () => {
    const {description, director, rating, scores, starring} = movieCard;

    const tree = renderer
      .create(<PageOverview
        description={description}
        director={director}
        rating={rating}
        scores={scores}
        starring={starring}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
