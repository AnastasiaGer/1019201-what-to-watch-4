import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import MoviePage from './movie-page';
import {movies, movieCard} from '../../utils/test-data.js';
import NameSpace from '../../reducer/name-space';
import {Router} from 'react-router-dom';
import history from '../../history';

const mockStore = configureStore([]);

describe(`MoviePage`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies,
      },
      [NameSpace.APP_STATE]: {
        currentMovie: movieCard,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        userInfo: {
          id: 1,
          email: `ivanov@dmail.ru`,
          name: `Ivan`,
          avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
        }
      },
    });

    store.dispatch = jest.fn();

    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MoviePage
                renderTabs={() => {}}
                activeTab={``}
                loadMovieInformation={() => {}}
                routeProps={{match: {params: {id: 167456}, isExact: true, path: ``, url: ``}}} />
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
