import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Review from './review';

const review = {
  id: 4563456345,
  user: {
    id: 1223,
    name: `Amanda Greever`,
  },
  rating: 8.0,
  comment: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
  date: `2019-05-08T14:13:56.569Z`,
};

describe(`MovieReview`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<Review
        movieReview={review}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
