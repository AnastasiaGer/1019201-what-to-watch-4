import React from 'react';
import PropTypes from 'prop-types';

import Review from '../review/review.jsx';

const PageReviews = (props) => {
  const {movieReviews} = props;

  const halfOffReviews = Math.round(movieReviews.length / 2);
  const reviewsForFirstCol = movieReviews.slice(0, halfOffReviews);
  const reviewsForSecondCol = movieReviews.slice(halfOffReviews);

  const getReview = (review) => {
    return (
      <Review
        key = {review.id}
        review={review}
      />
    );
  };

  const renderFirstReviewsCol = () => reviewsForFirstCol.map(getReview);
  const renderSecondReviewsCol = () => reviewsForSecondCol.map(getReview);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {renderFirstReviewsCol()}
      </div>
      <div className="movie-card__reviews-col">
        {renderSecondReviewsCol()}
      </div>
    </div>
  );
};
PageReviews.propTypes = {
  movieReviews: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired
  ),
};
export default PageReviews;
