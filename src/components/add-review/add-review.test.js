import React from 'react';
import renderer from 'react-test-renderer';
import {movieCard} from '../../utils/test-data.js';
import AddReview from './add-review';
import NameSpace from '../../reducer/name-space';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

describe(`Catalog`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      [NameSpace.APP_STATE]: {
        currentPage: `main`,
        currentMovie: movieCard,
      },
      [NameSpace.USER]: {
        userInfo: {
          id: 1,
          email: `ivanov@dmail.ru`,
          name: `Ivan`,
          avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
        }
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <AddReview
              currentMovie={movieCard}
              isReviewSending={false}
              isSendingError={false}
              onSubmitClick={() => {}}
              onFormChange={() => {}}
              onRatingChange={() => {}}
              onReviewChange={() => {}}
              isSubmitDisabled={false}
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
