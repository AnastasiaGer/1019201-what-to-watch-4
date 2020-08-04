import * as React from 'react';
import {CustomPropTypes} from '../../utils/props';

import {RatingLevel} from '../../const';

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


const PageOverview = (movieCard) => {
  const {rating, scores, description, director, starring} = movieCard;
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
  movieCard: CustomPropTypes.MOVIE,
};
export default PageOverview;