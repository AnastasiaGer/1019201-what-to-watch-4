import {RatingLevel} from './const';

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getMovieRatingDescription = (rating) => {
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

export const sliceReviews = (movieReviews) => {
  const halfOffReviews = Math.round(movieReviews.length / 2);
  const col1 = movieReviews.slice(0, halfOffReviews);
  const col2 = movieReviews.slice(halfOffReviews, movieReviews.length);

  return [col1, col2];
};

export const getRatingFormat = (rating) => {
  if (Math.trunc(rating) === rating) {
    return `${rating},0`;
  }

  return rating.toString().replace(`.`, `,`);
};
