import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MoviesList from "./movies-list";
import {movies} from '../../test-data';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from '../../history';

const mockStore = configureStore([]);

describe(`MoviesList`, () => {
  it(`Should render correctly movie card`, () => {
    const store = mockStore({
      movies,
      activeGenre: `All genres`,
    });

    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MoviesList
                movies={movies}
                render={() => null}
              /></Provider>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }
      )
  .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
