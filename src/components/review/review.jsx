import React from 'react';
import moment from 'moment';
import {CustomPropTypes} from '../../utils/props.js';
import {getRatingFormat} from '../../utils/utils.js';


const Review = ({movieReview}) => {

  const rating = getRatingFormat(movieReview.rating);
  const date = moment(movieReview.date).format(`MMMM D, YYYY`);
  const dateToISO = moment(movieReview.date).format(`YYYY-MM-DD`);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{movieReview.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{movieReview.user.name}</cite>
          <time className="review__date" dateTime={dateToISO}>{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

Review.propTypes = {
  movieReview: CustomPropTypes.REVIEWS,
};

export default Review;
