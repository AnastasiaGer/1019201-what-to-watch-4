import {RatingLevel, RatingNumber} from './const';

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const noop = () => {
  // Mock function for test props
};


export const getMovieRatingDescription = (rating) => {
  let ratingLevel = ``;
  if (rating === RatingNumber.AWESOME) {
    ratingLevel = RatingLevel.AWESOME;
  } else if (rating >= RatingNumber.VERY_GOOD) {
    ratingLevel = RatingLevel.VERY_GOOD;
  } else if (rating >= RatingNumber.GOOD) {
    ratingLevel = RatingLevel.GOOD;
  } else if (rating >= RatingNumber.NORMAL) {
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
