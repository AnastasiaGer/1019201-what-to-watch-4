import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {movieCard} from '../../test-data';
import {noop} from '../../utils';
import AddReview from './add-review';
import NameSpace from '../../reducer/name-space';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from '../../history';

const mockStore = configureStore([]);


describe(`AddReview`, () => {
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
          avatarURL: `https://4.react.pages.academy/wtw/asda.jpg`,
        }
      },
    });

    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <AddReview
                currentMovie={movieCard}
                isDataSending={false}
                isDispatchError={false}
                onSubmitClick={noop}
                onFormChange={noop}
                onRatingChange={noop}
                onReviewChange={noop}
                ratingIsValid={true}
                reviewIsValid={true}
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
