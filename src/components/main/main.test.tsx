import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Main from './main';
import {movieCard, movies, reviews} from '../../test-data';
import NameSpace from '../../reducer/name-space';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from '../../history';
import {noop} from '../../utils';

const genres = [`Comedies`, `Crime`, `Documentary`];
const activeGenre = `Comedies`;

const mockStore = configureStore([]);

describe(`Main`, () => {
  it(`Should render correctly with movies titles array`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movieCard,
        movies,
        moviesReviews: reviews,
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
          email: `ivanov@dmail.ru`,
          name: `Ivan`,
          avatarURL: `https://4.react.pages.academy/wtw/asda.jpg`,
        },
        message: `To be or not to be`,
      },
    });
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <Main
                movieCard={movieCard}
                movies={movies}
                onMovieCardClick={noop}
                genres={genres}
                activeGenre={activeGenre}
                onGenreItemClick={noop}
                onShowMoreClick={noop}
                onPlayClick={noop}
              />
            </Provider>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
