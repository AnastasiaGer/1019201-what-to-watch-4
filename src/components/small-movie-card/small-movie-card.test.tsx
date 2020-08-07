import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card';
import {movieCard} from '../../test-data';
import {noop} from '../../utils';
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
              onPlayFilmHandle={noop}
            />
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
