import React from 'react';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../../utils/props.js';
import Review from '../review/review.jsx';

const sliceReviews = (reviews) => {
  const sliceIndex = Math.ceil(reviews.length / 2);
  const firstColReviews = reviews.slice(0, sliceIndex);
  const secondColReviews = reviews.slice(sliceIndex, reviews.length);

  return [firstColReviews, secondColReviews];
};
const PageReviews = ({movieReviews}) => {
  const slicedReviews = sliceReviews(movieReviews);

  return (
    <React.Fragment>
      <div className="movie-card__reviews movie-card__row">
        {slicedReviews.map((slicedReview, index) => {
          return (
            <div key={Math.random() + index} className="movie-card__reviews-col">
              {slicedReview.map((review) => <Review movieReview={review} key={Math.random() + review.id} />)}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
PageReviews.propTypes = {
  movieReviews: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(CustomPropTypes.REVIEWS),
    PropTypes.bool,
  ]),
};
export default PageReviews;
