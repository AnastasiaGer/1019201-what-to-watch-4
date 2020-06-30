import React from 'react';
import PropTypes from 'prop-types';

import Review from '../review/review.jsx';

const PageReviews = (props) => {
  const {movieReviews} = props;

  const commentsMiddle = Math.round(movieReviews.length / 2);
  const commentsForFirstCol = movieReviews.slice(0, commentsMiddle);
  const commentsForSecondCol = movieReviews.slice(commentsMiddle);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {commentsForFirstCol.map((review) => <Review key = {review.id} review = {review}/>)}
      </div>
      <div className="movie-card__reviews-col">
        {commentsForSecondCol.map((review) => <Review key = {review.id} review = {review}/>)}
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
