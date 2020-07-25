export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const sliceReviews = (movieReviews) => {
  const halfOffReviews = Math.round(movieReviews.length / 2);
  const col1 = movieReviews.slice(0, halfOffReviews);
  const col2 = movieReviews.slice(halfOffReviews, movieReviews.length);

  return [col1, col2];
};
