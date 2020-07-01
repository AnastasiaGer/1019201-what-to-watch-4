import React from 'react';
import {CustomPropTypes} from '../../utils/props.js';
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
  movieReviews: CustomPropTypes.REVIEWS,

};

export default PageReviews;
