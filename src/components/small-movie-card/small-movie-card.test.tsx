import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SmallMovieCard from "./small-movie-card";
import {movieCard, noop} from '../..//test-data';
import {Router} from 'react-router-dom';
import history from '../../history';

describe(`SmallMovieCard`, () => {
  it(`Should render correctly movie card`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
              <SmallMovieCard
                movie={movieCard}
                isPlaying={false}
                setPlayingFilm={noop}
              />
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
