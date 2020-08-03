import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PageReviews from './page-reviews.jsx';
import {movieReviews} from '../../utils/test-data.js';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);

describe(`PageReviews`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movieReviews
    },
  });

  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <PageReviews />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
