import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {movieCard, movies, movieReviews} from '../../utils/test-data.js';
import NameSpace from '../../reducer/name-space';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';


const mockStore = configureStore([]);

describe(`MoviePage`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies,
      },
      [NameSpace.APP_STATE]: {
        currentMovie: movieCard,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <MoviePage
              movieCard={movieCard}
              movies={movies}
              movieReviews={movieReviews}
              renderTabs={() => {}}
              activeTab={``}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
