import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {movies} from '../../utils/test-data.js';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

describe(`MoviesList`, () => {
  it(`Should render correctly movie card`, () => {
    const store = mockStore({
      movies,
      activeGenre: `All genres`,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <MoviesList
              movies={movies}
              onMovieCardClick={() => {}}
              handleSmallMovieCardHover={() => {}}
              render={() => {}}
            /></Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
  .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
