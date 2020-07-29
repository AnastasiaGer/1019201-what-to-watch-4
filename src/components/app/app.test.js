import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {movieCard, movies, movieReviews} from '../../utils/test-data.js';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

const activeGenre = `Drama`;
const genres = [`All genres`, `Drama`, `Documentary`, `Horror`];

const createNodeMock = () => {
  return {};
};

describe(`App`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movieCard,
        movies,
        movieReviews,
      },
      [NameSpace.APP_STATE]: {
        activeGenre: `All genres`,
        currentPage: `main`,
        currentMovie: movieCard,
        isMainPage: true,
        isVideoPlayer: false,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        userInfo: {
          id: 1,
          email: `ivanov@dmail.ru`,
          name: `Ivan`,
          avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
        },
        message: `To be or not to be`,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              movieCard={movieCard}
              movies={movies}
              movieReviews={movieReviews}
              genres={genres}
              activeGenre={activeGenre}
              onGenreItemClick={() => {}}
              onShowMoreClick={() => {}}
            />
          </Provider>, {createNodeMock})
     .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
