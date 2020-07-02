import React from 'react';
import renderer from 'react-test-renderer';
import PageDetails from './page-details.jsx';
import {movieCard} from '../../utils/test-data.js';

describe(`PageDetails`, () => {
  it(`Should render correctly`, () => {
    const {director, genre, movieDurationTime, starring, date} = movieCard;

    const tree = renderer
      .create(<PageDetails
        director={director}
        genre={genre}
        movieDurationTime={movieDurationTime}
        starring={starring}
        date={date}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
