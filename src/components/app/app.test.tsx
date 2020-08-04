import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app";
import {movieCard, movies, reviews, noop} from '../../test-data';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

describe(`App`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movieCard,
        movies,
        movieReviews: reviews,
        isLoading: false,
        isLoadError: false,
      },
      [NameSpace.APP_STATE]: {
        activeGenre: `All genres`,
        currentPage: `main`,
        currentMovie: movieCard,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        isAuthorizationError: false,
        isAuthorizationProgress: true,
        userInfo: {
          id: 1,
          email: `ivanov@dmail.ru`,
          name: `Ivan`,
          avatarURL: `https://4.react.pages.academy/wtw/asda.jpg`,
        },
        message: `To be or not to be`,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              isLoadError={false}
              isAuthorizationProgress={true}
              isLoading={false}
              authorizationStatus={`AUTH`}
              setActiveGenre={noop}
              loadMovies={noop}
              movieCard={movieCard}
              isVideoPlayer={false}
              movies={movies}
              login={`ivanov@dmail.ru`}
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
