import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {movieCard, noop} from '../../test-data';
import AddReview from './add-review';
import NameSpace from '../../reducer/name-space';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from '../../history';
import {PostReview} from '../../types';

const mockStore = configureStore([]);

const Settings: PostReview = {
  rating: 5,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
};

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
                isReviewSending={false}
                isDispatchError={false}
                onSubmitClick={noop}
                onFormChange={noop}
                onRatingChange={noop}
                onReviewChange={noop}
                isSubmitDisabled={false}
                rating={Settings.rating}
                comment={Settings.comment}
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
