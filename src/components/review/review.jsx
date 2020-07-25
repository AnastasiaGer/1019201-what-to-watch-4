import React from 'react';

import {CustomPropTypes} from '../../utils/props.js';


const Review = ({movieReview}) => {

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{movieReview.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{movieReview.user.name}</cite>
          <time className="review__date" dateTime={movieReview.date}>{movieReview.date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{movieReview.rating}</div>
    </div>
  );
};

Review.propTypes = {
  movieReview: CustomPropTypes.REVIEWS,
};

export default Review;
