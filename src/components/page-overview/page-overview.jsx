import React from 'react';
import PropTypes from 'prop-types';

import {RatingLevel} from '../../const.js';

const getMovieRatingDescription = (rating) => {
  let ratingLevel = ``;
  if (rating === 10) {
    ratingLevel = RatingLevel.AWESOME;
  } else if (rating >= 8) {
    ratingLevel = RatingLevel.VERY_GOOD;
  } else if (rating >= 5) {
    ratingLevel = RatingLevel.GOOD;
  } else if (rating >= 3) {
    ratingLevel = RatingLevel.NORMAL;
  } else {
    ratingLevel = RatingLevel.BAD;
  }
  return ratingLevel;
};


const PageOverview = ({rating, scores, description, director, starring}) => {

  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getMovieRatingDescription(rating)}</span>
          <span className="movie-rating__count">{scores} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {starring}</strong></p>
      </div>
    </>
  );
};
PageOverview.propTypes = {
  rating: PropTypes.number.isRequired,
  scores: PropTypes.number.isRequired,
  description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
export default PageOverview;
