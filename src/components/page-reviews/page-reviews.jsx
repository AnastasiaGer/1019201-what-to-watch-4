import React from 'react';
import PropTypes from 'prop-types';

import Review from '../review/review.jsx';

const PageReviews = (props) => {
  const {movieReviews} = props;

  const halfOffReviews = Math.round(movieReviews.length / 2);
  const col1 = movieReviews.slice(0, halfOffReviews);
  const col2 = movieReviews.slice(halfOffReviews);

  const getReviews = (filmReviews) => {
    return (
      <div className="movie-card__reviews-col">
        {filmReviews.map((review) => {
          return <Review
            key={review.id}
            review={review}
          />;
        })}
      </div>
    );
  };

  return (
    <div className="movie-card__reviews movie-card__row">

      {getReviews(col1)}
      {getReviews(col2)}

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
