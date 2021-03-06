import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MoviePage from './movie-page';
import {movies, movieCard} from '../../test-data';
import {noop} from '../../utils';
import NameSpace from '../../reducer/name-space';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from '../../history';
import {adaptMovie, adaptMovies} from '../../adapters/movie';

const mockStore = configureStore([]);

describe(`MoviePage`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies: adaptMovies(movies)
      },
      [NameSpace.APP_STATE]: {
        currentMovie: adaptMovie(movieCard)
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        userInfo: {
          id: 1,
          email: `ivanov@dmail.ru`,
          name: `Ivan`,
          avatarURL: `https://4.react.pages.academy/wtw/asda.jpg`,
        },
      },
    });

    store.dispatch = jest.fn();

    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MoviePage
                currentMovie={adaptMovie(movieCard)}
                renderTabs={noop}
                activeTab={``}
                loadMovieInformation={noop}
                routeProps={{match: {params: {id: 167456}, isExact: true, path: ``, url: ``}}}
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


