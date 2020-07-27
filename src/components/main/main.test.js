import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {movieCard, movies, moviesReviews} from '../../utils/test-data.js';
import NameSpace from '../../reducer/name-space';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const genres = [`Comedies`, `Crime`, `Documentary`];
const activeGenre = `Comedies`;

const mockStore = configureStore([]);

describe(`Main`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movieCard,
        movies,
        moviesReviews,
      },
      [NameSpace.APP_STATE]: {
        activeGenre: `All genres`,
        currentPage: `main`,
        currentMovie: movieCard,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        userInfo: {
          id: 1,
          email: `sadas@dsasd.ru`,
          name: `asdasd`,
          avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
        },
        message: `asdasd`,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Main
              movieCard={movieCard}
              movies={movies}
              onMovieCardClick={() => {}}
              genres={genres}
              activeGenre={activeGenre}
              onGenreItemClick={() => {}}
              shown={0}
              onShowMoreClick={() => {}}
              onPlayClick={() => {}}
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
