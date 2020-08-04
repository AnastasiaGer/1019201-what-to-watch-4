import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {movies} from '../../test-data';
import NameSpace from '../../reducer/name-space';
import MyList from './my-list';
import {Router} from 'react-router-dom';
import history from '../../history';
import {AuthorizationStatus} from '../../const';

const mockStore = configureStore([]);

describe(`MyList`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteMovies: movies,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userInfo: {
        id: 1,
        email: `ivanov@dmail.ru`,
        name: `Ivan`,
        avatarURL: `https://4.react.pages.academy/wtw/asda.jpg`,
      }
    }
  });

  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MyList />
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
